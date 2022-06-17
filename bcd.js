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
}catch(e){};})();
