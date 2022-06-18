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
	
//Check access function, because native "AllowItem" works only after inspect the target
//t - target, if empty = player
//c - character who should have access, if empty = player
function chka (t, c) {
//if target is empty we take target of whisper, if no whisper target we take player
if (!t) {t = Player; ChatRoomCharacter.forEach(w=>{if (w.MemberNumber == ChatRoomTargetMemberNumber) t = w})};
//if character is empty we take current character, if no current character we take player
if (!c) c = (CurrentCharacter) ? CurrentCharacter : Player;
//if character equal target we don't check and just return true, cause player always has access to themself
if (t == c) return true;
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
// now we compare target's permissions and character status. first we check one special case
if (tp == 2 && ca == 1) {console.log (c.Name+" needs "+(ReputationCharacterGet(t,"Dominant") - 25 - ReputationCharacterGet(c,"Dominant"))+" more dominant reputation to has access to  "+t.Name);return false}
// then we chek other cases
else if (tp>ca) {console.log (c.Name+" doesn't have access to "+t.Name);return false}
else if (tp<=ca) {console.log (c.Name+" has access to "+t.Name);return true}
else console.log ("something happened wrong")
}
// end of check access function
	
}catch(e){};})();
