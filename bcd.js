javascript:(()=>{try {
Player.BCD="1.0";
   CommandCombine(
		{
			Tag: 'timer', 
			Description: "first call to load",
			Action: args => {
			javascript:(()=>{fetch('https://d1sey.github.io/timer.js').then(r=>r.text()).then(r=>eval(r));})();
            ServerSend("ChatRoomChat",{Content:'*Timer was loaded. Now the command "/timer" starts timer. Type "/help timer" for hint',Type:"Emote",Target:Player.MemberNumber});
			}
		});
ServerSend("ChatRoomChat",{Content:'*Base script was loaded. Now available the command "/timer"',Type:"Emote",Target:Player.MemberNumber});
	
//Check access, because native "AllowItem" works only after inspect the target
//t - target, if empty = player
//c - character who should have access, if empty = player
//r - response, if true we send response to chat
function chka (t, c, r) {
// we declare m for response message and a fpr answer to check
let m;
let a;
// if target is empty we take target of whisper, if no whisper target we take player
if (!t) {t = Player; ChatRoomCharacter.forEach(w=>{if (w.MemberNumber == ChatRoomTargetMemberNumber) t = w})};
// if character is empty we take current character, if no current character we take player
if (!c) c = (CurrentCharacter) ? CurrentCharacter : Player;
// if character equal target we don't check and just return true, cause player always has access to themself
if (t == c) {
  if (t == Player)  m = "*You always have access to yourself";
  else m = "*Player always has access to themself";
  // and send it to chat if response parametr is true
  if (r) ServerSend("ChatRoomChat",{Content:m,Type:"Emote",Target:Player.MemberNumber});
  return true};
// then we begin to check, first we take item permissions from the target
// 0 = everyone, no exceptions
// 1 = everyone, except blacklist
// 2 = owner, lover, whitelist & dominant
// 3 = owner, lover and whitelist only
// 4 = owner and lover only
// 5 = owner only
let tp = t.ItemPermission;
// then we check each level for character, base is 0, cause even blacklisted character has access
let ca = 0;
// check character for target's blacklist
if (!t.BlackList.includes(c.MemberNumber)) ca = 1;
// check dominance of character and target, character need at least 25 dom.rep lower target's dom.rep to has access
if (ReputationCharacterGet(t,"Dominant") - 25 <= ReputationCharacterGet(c,"Dominant")) ca = 2;
// check character for target's whitelist
if (t.WhiteList.includes(c.MemberNumber)) ca = 3;
// check for loverships
t.Lovership.forEach(l=>{if (l.MemberNumber == c.MemberNumber) ca = 4});
// check for ownership
if ((t.Ownership) && (t.Ownership.MemberNumber == c.MemberNumber)) ca = 5;
// now we compare target's permissions and character status.
if (tp>ca) {a = false; // if target's permissions bigger than character status - access is false
  // if target's permissions is dominant access, and character is not an owner/lover/whiteelisted and hasn't enough dominant reputation we comment it and show how more reputation need
  if (tp == 2 && ca == 1) m = "*"+c.Name+" needs "+(ReputationCharacterGet(t,"Dominant") - 25 - ReputationCharacterGet(c,"Dominant"))+" more dominant reputation to has access to  "+t.Name;
  // in all other cases we just tell about no access
  else m = "*"+c.Name+" doesn't have access to "+t.Name;}
// if access is true we set it and just tell it
else if (tp<=ca) {m = "*"+c.Name+" has access to "+t.Name;a = true}
else console.log ("something happened wrong");
// if response parametr is true we send these commens to chat, else we send it only to console
if (r) ServerSend("ChatRoomChat",{Content:m,Type:"Emote",Target:Player.MemberNumber});
console.log(m);
return a;
}
// end of check access function
	
}catch(e){};})();
