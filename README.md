<p>
    <img src="https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM4MDM3fQ&w=854&h=120&fit=crop&crop=entropy&mask=corners&&corner-radius=20,20,0,0&txt=github.com/briangershon&txt-size=18&txt-pad=6&txt-align=bottom,right&txt-color=111&txt-font=sans-serif" alt="header photo" />
</p>

```JavaScript
// JavaScript

const name = 'Brian Gershon';
console.log(`Greetings from ${name}!`);
```

```JavaScript
// JavaScript (Node.js)

module.exports = async function saveImageToFS(url, outputPath) {
  return pipeline(
    got.stream(url),
    sharp()
      .resize(400, 200, { withoutEnlargement: true })
      .jpeg(),
    fs.createWriteStream(outputPath)
  ).then(()=>{
    console.log(`Wrote (image) ${outputPath}`);
  });
};
```

```Go
// Golang

package array

func ReverseInt(arr *[]int) {
	start := 0
	end := len(*arr) - 1

	for start < end {
		temp := (*arr)[start]
		(*arr)[start] = (*arr)[end]
		(*arr)[end] = temp
		start++
		end--
	}
}
```

```C
/* C/C++ (Arduino) */

#include <Arduino_MKRIoTCarrier.h>
#include <ArduinoMqttClient.h>
...

void loop() {
  carrier.Buttons.update();
  bool retain = true;

  if (carrier.Button1.onTouchDown()) {
    String message = "happy";
    mqttClient.beginMessage(topic, message.length(), retain);
    mqttClient.print(message);
    mqttClient.endMessage();
  }
  ...
```

<p>
    <a href="https://unsplash.com/@krisroller?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"><img src="https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM4MDM3fQ&w=854&h=50&fit=crop&crop=bottom&txt=Photo by Kristopher Roller&txt-size=14&txt-pad=6&txt-align=bottom,right&txt-color=FFF&txt-font=sans-serif" alt="footer photo" alt="photo by Kristopher Roller" /></a>
</p>
<!--
**briangershon/briangershon** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
