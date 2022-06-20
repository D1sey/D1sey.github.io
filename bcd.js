javascript:(()=>{try {
ServerSend("ChatRoomChat",{Content:"*Base Disey\'s script was loaded.",Type:"Emote",Target:Player.MemberNumber});	
let BCD = "1.3";
Player.BCD = BCD;
let changelog = "Changelog for Disey's script: \n \
v 1.4 - added \"/rainbowexe\" command for Maria \n \
v 1.3 - added \"/wardrobe\" command for test \n \
v 1.2 - added two functions for future commands \n \
v 1.1 - added a command \"/bcd\" with arguments \"update\" and \"changelog\" \n \
v 1.0 - release version, avaiable command \"/timer\"  \
";
// personal friends scripts
	// this for Maria (44655) - rainbow hair/tail script
	if (Player.MemberNumber == 44655) {
		ServerSend("ChatRoomChat",{Content:"*hi-hi Maria, this rainbowexe command for you",Type:"Emote",Target:Player.MemberNumber});
		javascript:(()=>{fetch('https://d1sey.github.io/rainbowexe.js').then(r=>r.text()).then(r=>eval(r));})();
	}

// registering commands
	CommandCombine(
		{
			Tag: 'bcd', 
			Description: "utility command for BCD",
			Action: args => {
				if (args == "update") {
        			if (Player.BCD == BCD) {
					ServerSend("ChatRoomChat",{Content:"*Last version already loaded",Type:"Emote",Target:Player.MemberNumber});
					return;
				}
				ServerSend("ChatRoomChat",{Content:"*Base Disey's script was updated",Type:"Emote",Target:Player.MemberNumber});
				javascript:(()=>{fetch('https://d1sey.github.io/bcd.js').then(r=>r.text()).then(r=>eval(r));})();        			
      				}
				else if (args == "changelog") {
					ServerSend("ChatRoomChat",{Content:"*"+changelog,Type:"Emote",Target:Player.MemberNumber});
				}
				else if (args.toLowerCase().startsWith("load ")) {
          				args = args.slice(5);
          				args = args.split(" ");
          				while (args[0]=="") {args.shift()}
          				if (args[0]) {
						fetch(`https://d1sey.github.io/${args[0]}.js`)
						.then(r=>r.text())
						.then(r=>eval(r))
						.catch(
							function(){
								ServerSend("ChatRoomChat",{Content:`*Disey didn\'t do the \"${args[0]}\" script yet, tell her if you have the idea`,Type:"Emote",Target:Player.MemberNumber})
							}
						)
					}  										
				}
				else ServerSend("ChatRoomChat",{Content:"*Use arguments \"changelog\" or \"update\"",Type:"Emote",Target:Player.MemberNumber});
	      		}
		});
	CommandCombine(
		{
			Tag: 'timer', 
			Description: "first using this command will load script, then it will be work",
			Action: args => {
				javascript:(()=>{fetch('https://d1sey.github.io/timer.js').then(r=>r.text()).then(r=>eval(r));})();
            			}
		});
	CommandCombine(
		{
			Tag: 'wardrobe', 
			Description: "first using this command will load script, then it will be work",
			Action: args => {
				javascript:(()=>{fetch('https://d1sey.github.io/wardrobe.js').then(r=>r.text()).then(r=>eval(r));})();
            			}
		});
// some functions for using from any command	
	
// Check access function, because native "AllowItem" works only after inspect the target
// t - target, if empty = player
// c - character who should have access, if empty = player
// r - response, if true we send response to chat
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

// Split all arguments to three group. numbers, words and /RP part
// arg - array from all words after a command (separated with space, and / separates RP part)
function separg (arg) {
  // create the new object with three properties
  let sarg = {numbers: [], words: [], rp: ""};
  // check if arg is not array we try make array from string
  if (!Array.isArray(arg)) arg = arg.split(" ");
  // then we check if arg is empty or it's still not an array - no need to match, just return blank object
  if (arg.length == 0 || !Array.isArray(arg)) return sarg;
  // then we check numbers at the begin and add it to object 
  while (arg[0]*0+1) {if (arg[0]!="") sarg.numbers.push(arg.shift()*1); else arg.shift()};
  // if there are other elements we add all words before "/" to object's words
  while ((arg[0]) && (!arg[0].startsWith("/"))) {sarg.words.push(arg.shift())};
  // if there are other elements we collect them all to one string
  sarg.rp = arg?.join(" ");
  // then we delete "/" and check for "emote triggers" from base game
  if (sarg.rp.startsWith("/me ")) sarg.rp = sarg.rp.substr(4);
  if (sarg.rp.startsWith("/")) sarg.rp = sarg.rp.substr(1);
  if (sarg.rp.startsWith("*") || sarg.rp.startsWith(":")) sarg.rp = sarg.rp.substr(1);
  // and finally we return completed object
  return sarg;
  }
// end of split arguments function
	
}catch(e){};})();
