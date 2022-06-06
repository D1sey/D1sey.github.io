javascript:(()=>{try {
CommandCombine(
		{
			Tag: 'timer', 
			Description: "[one or a few numbers separated with space] [manual description instead default] - starts direct or random timer with sound signal of finish (only you hear it)",
			Action: args => {
let t = [];
let j = NaN;
let m = args;
let l = m.length;
if (m)
	{
  m = m.split(" ");
	while (m[0]*0+1) {
  t.push(m.shift()*1)};
  m = m.join(" ");
  }
        console.log(t);
if (t.length==1 && t[0]=="") t[0] = 30;
if (t.length==2) t.sort(function(a,b){return a-b});
        console.log(t);
if (!m && t.length==1) m = "starts "+t[0]+" sec timer";
else if (!m && t.length==2) m = "starts random timer between "+t[0]+" and "+t[1]+" sec";
else if (!m && t.length>2) m = "starts one of the following timers at random: "+t.join(", ");
ServerSend("ChatRoomChat",{Content:m,Type:"Emote"});
if (t.length==1) {
  j=t[0];
  m="*"+Player.Nickname+"'s "+j+" sec timer is over";
}
else if (t.length==2) {
  j=Math.floor((Math.random() * (t[1]-t[0]+1)) + t[0]);
  m="*"+Player.Nickname+"'s random timer is over with "+j+" sec";
}
else if (t.length>2) {
  j=t[Math.floor((Math.random() * t.length))];
  m="*"+Player.Nickname+"'s timer is over. It was "+j+" sec timer";}

setTimeout(function timer()
    {
    ServerSend("ChatRoomChat",{Content:m,Type:"Emote"});
    AudioPlayInstantSound("Audio/"+AudioGetFileName("BellMedium")+".mp3", 1);
     }, j*1000);
       }
		})
} catch(e){};})();
