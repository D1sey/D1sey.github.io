javascript:(()=>{try {
	ServerSend("ChatRoomChat",{Content:"*Rainbow hair script was loaded.",Type:"Emote",Target:Player.MemberNumber});
   	CommandCombine(			
			{
				Tag: "rainbowexe",
				Description: "\"/rainbowexe [number] chaos\" - [number] is delay between changes (5 sec if it's empty). Chaos is chaos. Second using will stop changes.",
				Action: (_, command) => {
					let [, ...message] = command.split(" "), pc = null, ch = false, rt = 1,
          cl = ["Eyes", "Eyes2", "HairFront", "HairBack", "HairAccessory1", "HairAccessory2", "TailStraps", "Wings"],
	  rp = [
            `taps herself with a magic wand and her colors go wild`,
            `spills a colorful potion on herself and her colors begin changing`,
            `hiccups and strange colors start appearing`,
            `*The end of a rainbow lands on ${Player.Nickname} and she starts changing colors`,
            `eats a strange mushroom and starts flashing colors`,
            `puts a rotating prism in front of the nearest light source`,
            `rolls a die to decide what color she should be. The die gets stuck on its edge`,
            `plugs her hair into a random number generator`,
            `levels up and unlocks a new color palette`,
            `*A passing fairy sprinkles some dust on ${Player.Nickname} and her colors shift`,
            `*A glitch in the code causes ${Player.Nickname}'s colors to become undefined`
          ];
          if (Player.rainbow) {Player.rainbow = NaN;return}
          else {
            if (message[0]*0+1) Player.rainbow = message[0]*1;
            for (let i=0;i<message.length;i++) {if (message[i].toLowerCase().includes("chaos")) ch = true};
          	if (Player.rainbow < 0) Player.rainbow = Player.rainbow * -1;
            if (!Player.rainbow) Player.rainbow = 5;
          }
					function ColorChanger() {
            if (!Player.rainbow) return;
            setTimeout(function() {
              ColorChanger()},Player.rainbow*1000*rt);
            pc = '#'+Math.floor(Math.random()*16777216).toString(16).padStart(6, "0")
            if (ch) {
              rt = Math.floor((Math.random()*101)+50)/100;
              pc = null;
            }
            cl.forEach(a=>{
              if (InventoryGet(Player, a)) {
                InventoryGet(Player, a).Color = [];
                for (let i=0;i<5;i++) {
                  InventoryGet(Player, a).Color[i] = pc ? pc : '#'+Math.floor(Math.random()*16777216).toString(16).padStart(6, "0")
                }
              }
            })
            ChatRoomCharacterUpdate(Player);
          };
	  rp = rp[Math.floor(Math.random()*rp.length)];
	  ServerSend("ChatRoomChat",{Content:rp,Type:"Emote"});
          ColorChanger();
        },
      },
    )
}catch(e){};})();
