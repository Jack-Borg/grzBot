module.exports = {
	captcha: function (key) {
		return `<!DOCTYPE HTML>
	<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<title>KrunkBotCaptcha</title>
		</head>
		<body>
            <div style="position:absolute;left:50%;top:30%;transform: translate(-50%, -50%)";><h1>Captcha Harvester</h1></div>
			<div class="h-captcha" data-callback="sendToken" data-sitekey="${key}" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"></div>
			<script>
				function sendToken(){post('/', {'h-captcha-response': hcaptcha.getResponse()});}
				function post(path, params, method) {
					method = method || "post";
					var form = document.createElement("form");
					form.setAttribute("method", method);
					form.setAttribute("action", path);
					for(var key in params) {
						if(params.hasOwnProperty(key)) {
							var hiddenField = document.createElement("input");
							hiddenField.setAttribute("type", "hidden");
							hiddenField.setAttribute("name", key);
							hiddenField.setAttribute("value", params[key]);
							form.appendChild(hiddenField);
						}
					}
					document.body.appendChild(form);
					form.submit();
				}
			</script>
			<script src='https://hcaptcha.com/1/api.js'></script>
		</body>
	</html>`;
	},
	noCaptcha: function () {
		return `<!DOCTYPE HTML>
	<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<title>KrunkBotCaptcha</title>
		</head>
		<body>
            <div style="position:absolute;left:50%;top:30%;transform: translate(-50%, -50%)";><h1>Captcha Harvester</h1></div>
			<div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"><h3>KrunkBot passed captcha</h3></div>
		</body>
	</html>`;
	},
};
