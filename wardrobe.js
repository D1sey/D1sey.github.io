javascript:(()=>{try {
ServerSend("ChatRoomChat",{Content:'*Wardrobe was loaded. Now the command \"/wardrobe\" works. Type \"/help wardrobe\" for hint',Type:"Emote",Target:Player.MemberNumber});
CommandCombine({
			Tag: 'wardrobe',
    			Description: "How to use Disey\'s quick wardrobe: Write in the textbox \"/wardrobe\" with one of the follow options: \n\
A) You can use the slot number. \n\
B) You can use the complete name, part of the name or just a letter. \n\
C) You can search with numbers using \"-\" before it. \n\
# You can use \"0\" to strip one layer of clothes, \"00\" to strip two layers, etc.\n\
• Just using it without any text load the first slot. \n\
• If there are two or more coincidences, it display a list of all found outfits. \n\
• If there are more than 40 coincidences it ask for another keyword. \n\
• It works even if you are tied. \n\
• If you have selected target for whisper - this character will be dressed with chosen outfit (if you have access for this)",
			Action: (_, command) => {
			let [, ...message] = command.split(" "),
      m = message?.join(" "),
      p = (CurrentCharacter) ? CurrentCharacter : Player;
      ChatRoomCharacter.forEach(t=>{if (t.MemberNumber == ChatRoomTargetMemberNumber) p = t});
      if (p != Player) {if (!chka(p, Player, true)) return;}
      let l = Player.Wardrobe.length;
      let c = 0;
      let o;
      let w = [];
      let n;
      let y = 0;
      let pl = Player.MemberNumber;
		  function msg(n) {
        if (c == 0) ServerSend("ChatRoomChat",{Content:"*Outfit with name (or part of name) '"+m+"' was not found in your wardrobe. Try another name or keyword, or use the number of the outfit slot",Type:"Emote",Target:pl});
        else if (p == Player && c == 1) ServerSend("ChatRoomChat",{Content:"*You were dressed with outfit №"+w,Type:"Emote",Target:pl});
        else if (p != Player && c == 1) {ServerSend("ChatRoomChat",{Content:"*You dressed "+p.Name+" with outfit №"+w,Type:"Emote",Target:pl});
                      			             ServerSend("ChatRoomChat",{Content:"*You were dressed by "+Player.Name,Type:"Emote",Target:p.MemberNumber})}
        else if (c > 1) {if (w.length < 40) ServerSend("ChatRoomChat",{Content:"*You have "+c+" saved outfits with "+n+" '"+m+"':"+w+". Use the number of the outfit you need",Type:"Emote",Target:pl});
                        else ServerSend("ChatRoomChat",{Content:"*You have too many ("+c+") saved outfits with "+n+" '"+m+"'. Use a more specific keyword or the number of the outfit you need",Type:"Emote",Target:pl});}  
        };
  function wear(o)
    {
      WardrobeFastLoad(p, o, true);
      if (CurrentScreen == "ChatRoom") 
        {
          ChatRoomCharacterUpdate(p);
          CharacterRefresh(p);
        }
      else CharacterRefresh(p);
      if (CurrentCharacter) DialogLeave();
    };
  if (m)
    {
      if (m[0]=="0" && m*1==0) {for (let i=0;i<m.length;i++) {CharacterAppearanceStripLayer(p)};ChatRoomCharacterUpdate(p);CharacterRefresh(p);return};
      if (0 < m*1 && 1*m <= l) {o = 1*m-1;c = 1;w.push(" "+m+" - "+(Player.WardrobeCharacterNames[m*1-1]))}
      else if (1*m > l) {ServerSend("ChatRoomChat",{Content:"*You don't have so many wardrobe slots",Type:"Emote",Target:pl});return}
      else 
        {
          n = "name";
          if (0 > m*1) m = Math.abs(m)+"";
          for (let i = 0;i < l;i++)
            {
              if (Player.WardrobeCharacterNames[i].toLowerCase() == m.toLowerCase()) {c++; o = i;w.push(" "+(1+i)+" - "+Player.WardrobeCharacterNames[i])}
            };
					if (c == 0)
            {
              n = "keyword";
              for (let i = 0;i < l;i++)
                {
                  if (Player.WardrobeCharacterNames[i].toLowerCase().match(m.toLowerCase())) {c++; o = i;w.push(" "+(1+i)+" - "+Player.WardrobeCharacterNames[i])}
                }
              }
          }
      if (c == 1) wear(o);}
  else {w.push(" 1 - "+(Player.WardrobeCharacterNames[0]));c = 1;wear(0)}msg(n)}
})}catch(e){WardrobeFastLoad(Player, 0, true);CharacterRefresh(Player)};})();
