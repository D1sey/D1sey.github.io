javascript:(()=>{try {
   CommandCombine(
		{
			Tag: 'timer', 
			Description: "first call to load",
			Action: args => {
			javascript:(()=>{fetch('https://d1sey.github.io/timer.js').then(r=>r.text()).then(r=>eval(r));})();
			}
		})
} catch(e){};})();
