javascript:(()=>{try {
   CommandCombine(
		{
			Tag: 'timer', 
			Description: "first call to load",
			Action: args => {
			javascript:(()=>{fetch('https://d1sey.github.io/timer.js').then(r=>r.text()).then(r=>eval(r));})();
			ServerSend("ChatRoomChat",{Content:"*Timer was loaded. Now command /timer works",Type:"Emote",Target:Player.MemberNumber});
			}
		})
ServerSend("ChatRoomChat",{Content:"*Base script was loaded. Now aviable command: /timer",Type:"Emote",Target:Player.MemberNumber});
} catch(e){};})();
