javascript:(()=>{try {
   CommandCombine(
		{
			Tag: 'timer', 
			Description: "first call to load",
			Action: args => {
				fetch('https://d1sey.github.io/times.js').then(r=>r.text()).then(r=>eval(r));
			}
		})
} catch(e){};})();
