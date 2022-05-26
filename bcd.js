javascript:(()=>{
let t = 30;
let j = NaN;
try {
let m = document.getElementById("InputChat").value;
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
	if (j) t = j;
    m = m.slice(0,l);
  };
if (!m) m = "starts "+t+" sec timer";
ServerSend("ChatRoomChat",{Content:m,Type:"Emote"});
} catch(e){};
{
  setTimeout(function timer()
    {
    ServerSend("ChatRoomChat",{Content:"*timer is over",Type:"Emote"});
    AudioPlayInstantSound("Audio/"+AudioGetFileName("BellMedium")+".mp3", 1);
     }, t*1000);
};
  try 
  {
    document.getElementById("InputChat").value = "";
  } catch(e){};
})();
