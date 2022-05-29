javascript:(()=>{try {
CommandCombine(
		{
			Tag: 'timer', 
			Description: "[number] [not necessary number] [not necessary *emote] - starts direct or random timer with sound signal of finish (only you hear it)",
			Action: args => {
let t = [30];
let j = NaN;
let m = args;
let l = m.length;
if (m)
	{
  	if (m[0] == "*" || m[0] == ":") {m = m.slice(1);l = m.length};
    if (m.slice(0,4) == "/me ") {m = m.slice(4);l = m.length};
	for (let i = 1; i < 10; i++) 
    {
      if (m.slice(-i)*0+1)
      {
        j = m.slice(-i)*1;
        l = m.length-i;
      }
    };
	if (j) {t.pop();t.push(j)}
    j = NaN;
    m = m.slice(0,l);
    for (let i = 1; i < 10; i++)
    {
      if (m.slice(-i)*0+1)
      {
        j = m.slice(-i)*1;
        l = m.length-i;
      }
    }; 
    if (j){if (j>t[0]) t.push(j);else t.unshift(j)};
    m = m.slice(0,l);
  };
if (!m && t.length==1) m = "starts "+t[0]+" sec timer";
else if (!m && t.length==2) m = "starts random timer between "+t[0]+" and "+t[1]+" sec";
ServerSend("ChatRoomChat",{Content:m,Type:"Emote"});
if (t.length==1) {
  j=t[0];
  m="*"+Player.Name+"'s "+j+" sec timer is over";
}
else if (t.length==2) {
  j=Math.floor((Math.random() * (t[1]-t[0]+1)) + t[0]);
  m="*"+Player.Name+"'s random timer is over with "+j+" sec";
}
setTimeout(function timer()
    {
    ServerSend("ChatRoomChat",{Content:m,Type:"Emote"});
    AudioPlayInstantSound("Audio/"+AudioGetFileName("BellMedium")+".mp3", 1);
     }, j*1000);
       }
		})
} catch(e){};})();
