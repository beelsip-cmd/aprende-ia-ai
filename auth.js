import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './config.js';
const gate=document.getElementById('authGate'), app=document.getElementById('studentApp'), tab=document.getElementById('tabbar');
const error=document.getElementById('authError'), title=document.getElementById('authTitle'), name=document.getElementById('authName'), pass=document.getElementById('authPassword'), submit=document.getElementById('authSubmit');
let mode='login', user=null, timer=null, loading=false, sessionVersion=0;
const configured=SUPABASE_URL.startsWith('https://') && !SUPABASE_URL.includes('COLE_AQUI') && !SUPABASE_PUBLISHABLE_KEY.includes('COLE_AQUI');
if(!configured){error.textContent='Configuração pendente: preencha config.js com a URL e a chave publicável do Supabase.';submit.disabled=true;}
const db=configured?createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY):null;
function setMode(m){mode=m;title.textContent=m==='signup'?'Crie sua conta':m==='reset'?'Recuperar senha':m==='newpassword'?'Defina uma nova senha':'Entre na sua escola';name.style.display=m==='signup'?'block':'none';name.required=m==='signup';pass.style.display=m==='reset'?'none':'block';pass.required=m!=='reset';pass.autocomplete=m==='login'?'current-password':'new-password';submit.textContent=m==='signup'?'Cadastrar':m==='reset'?'Enviar recuperação':m==='newpassword'?'Salvar nova senha':'Entrar';document.getElementById('authToggle').textContent=m==='login'?'Criar uma conta':'Já tenho conta';error.textContent='';}
document.getElementById('authToggle').onclick=()=>setMode(mode==='login'?'signup':'login');document.getElementById('authReset').onclick=()=>setMode('reset');
document.getElementById('authForm').onsubmit=async e=>{e.preventDefault();if(!db||loading)return;loading=true;submit.disabled=true;error.textContent='';try{const email=document.getElementById('authEmail').value.trim(),password=pass.value;let result;
if(mode==='newpassword'){if(password.length<8)throw Error('A senha precisa ter ao menos 8 caracteres.');result=await db.auth.updateUser({password});}
else if(mode==='signup')result=await db.auth.signUp({email,password,options:{data:{full_name:name.value.trim()},emailRedirectTo:location.origin}});
else if(mode==='reset')result=await db.auth.resetPasswordForEmail(email,{redirectTo:location.origin});
else result=await db.auth.signInWithPassword({email,password});
if(result.error)throw result.error;
if(mode==='newpassword'){error.textContent='Senha atualizada. Você já pode acessar suas aulas.';setTimeout(()=>setMode('login'),1800);}
else if(mode==='reset')error.textContent='Se o e-mail estiver cadastrado, você receberá instruções de recuperação.';
else if(mode==='signup')error.textContent='Cadastro enviado. Confira seu e-mail para confirmar a conta, se solicitado.';
}catch(ex){error.textContent=ex.message||'Não foi possível continuar.'}finally{loading=false;submit.disabled=false;}};
async function persist(){if(!user||!db)return;const payload={user_id:user.id,display_name:S.name||user.user_metadata?.full_name||'',progress:S.done,xp:S.xp,streak:S.streak,last_day:S.lastDay,lab_used:S.labUsed,badges:S.badges,updated_at:new Date().toISOString()};const {error:err}=await db.from('student_progress').upsert(payload,{onConflict:'user_id'});if(err)console.error('Erro ao salvar progresso',err.message);}
window.persistStudent=()=>{clearTimeout(timer);timer=setTimeout(()=>persist(),350)};
window.addEventListener('pagehide',()=>{if(user&&db)persist()});
async function load(u){const {data, error:err}=await db.from('student_progress').select('*').eq('user_id',u.id).maybeSingle();if(err)throw err;
S={name:data?.display_name||u.user_metadata?.full_name||'',done:data?.progress||{},xp:data?.xp||0,streak:data?.streak||0,lastDay:data?.last_day||'',labUsed:data?.lab_used||false,instructor:false,badges:data?.badges||{}};
if(!data)await persist();render();}
async function sessionChanged(u){const version=++sessionVersion;user=u;if(!u){app.style.display='none';tab.style.display='none';gate.style.display='grid';return;}
try{await load(u);if(version!==sessionVersion)return;gate.style.display='none';app.style.display='grid';tab.style.display='';if(!document.getElementById('logout')){const b=document.createElement('button');b.id='logout';b.className='btn ghost sm';b.textContent='Sair da conta';b.onclick=()=>db.auth.signOut();document.getElementById('sideMe').appendChild(b);}}catch(ex){error.textContent='Falha ao carregar seus dados: '+ex.message;gate.style.display='grid';}}
if(location.hash.includes('type=recovery'))setMode('newpassword');
if(db){db.auth.onAuthStateChange((event,session)=>{if(event==='PASSWORD_RECOVERY'){setMode('newpassword');gate.style.display='grid';app.style.display='none';tab.style.display='none';return;}setTimeout(()=>{if(mode!=='newpassword')sessionChanged(session?.user||null)},0)});const {data}=await db.auth.getSession();if(mode!=='newpassword')await sessionChanged(data.session?.user||null);}
