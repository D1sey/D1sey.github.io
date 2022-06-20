javascript:(()=>{try {
   CommandCombine(			
			{
				Tag: "rainbowexe",
				Description: "[rainbowexe] [number] - [number] is delay between changes (5 sec if it's empty). Second using will stop changes",
				Action: (_, command) => {
					let [, ...message] = command.split(" "), rc;
          if (Player.rainbow) {Player.rainbow = NaN;return}
          else {
            if (message[0]*0+1) Player.rainbow = message[0]*1;
          	if (Player.rainbow < 0) Player.rainbow = Player.rainbow * -1;
            if (!Player.rainbow) Player.rainbow = 5;
          }
          function ColorChanger() {
            if (!Player.rainbow) return;
            setTimeout(function() {
              ColorChanger()},Player.rainbow*1000); 
            rc = '#'+Math.floor((Math.random()*15728639) + 1048576).toString(16); 
            InventoryGet(Player, "HairAccessory2").Color = rc; 
            InventoryGet(Player, "HairFront").Color = rc; 
            InventoryGet(Player, "TailStraps").Color = rc;
            rc = '#'+Math.floor((Math.random()*15728639) + 1048576).toString(16); 
            InventoryGet(Player, "Eyes").Color = rc; 
            InventoryGet(Player, "Eyes2").Color = rc; 
            ChatRoomCharacterUpdate(Player);
          };
          ColorChanger();
				},
			},
   )
}catch(e){};})();