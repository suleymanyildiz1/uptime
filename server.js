require("express")().listen(1343);

const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("NzM3MzM5NzYzNjk0MTA4NzUz.Xx77Kg.yyJ6_zRPoEsWVHPRLGJNsfAwANo");
const fetch = require("node-fetch");
const fs = require("fs");
/*const hook = new discord.WebhookClient(
  "737669686883516498",
  "X5vV9dX08B2GLLrE7WlSrcOhd6BmDBopJno9jAEO4ystn-58JfGOc_XJKGBjN0w14L3e"
);*/
const express = require("express");
const app = express();
const helmet = require("helmet");
const moment = require('moment');
console.log(`${moment().locale('tr').format('LLLL')}`)

const md = require("marked");

app.use(express.static("public"));

const request = require("request");
const url = require("url");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const Strategy = require("passport-discord").Strategy;

const templateDir = path.resolve(__dirname + `/`); // SITE DOSYA KONTROL

app.locals.domain = process.env.PROJECT_DOMAIN;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  let zaman = new Date();
  /* hook.send(`Pong! Tüm linkler'e izleme gönderildi zaman; ${zaman}`)*/
  console.log("Pong! Requests sent");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});


client.on("ready", () => {
  client.user.setActivity(
    `Site kodlanıyor by cenap / uptime system by mertbhey`
  );
  passport.use(
    new Strategy(
      {
        clientID: "737339763694108753",
        clientSecret: "W7oneD8yLIW21uNFz5g09j_QxAhhG-pN",
        callbackURL: "https://pc-uptimesitesi.glitch.me/callback",
        scope: ["identify"]
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
      }
    )
  );

  app.use(
    session({
      secret: "123",
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  let linkss;
  app.use(helmet());
  let links = db.get("linkler");
  let sahipp;
  var linkA = links.map(c => c.url);
  var sahip = links.map(c => c.owner);
      try {
linkss = linkA
 sahipp = sahip
    } catch (e) {
      console.log("" + e);
    }
  
  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      db: db,
      user: req.isAuthenticated() ? req.user : null,
      saat: `${moment().locale('tr').format('LLL')}`,
      linkss: linkss,
      sahipp: sahipp
    };
    res.render(
      path.resolve(`${templateDir}${path.sep}${template}`),
      Object.assign(baseData, data)
    );
  };
  app.get(
    "/login",
    (req, res, next) => {
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL;
      } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = "/";
      }
      next();
    },
    passport.authenticate("discord")
  );

  app.get("/logout", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });

  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }

  app.get("/autherror", (req, res) => {
    res.send(
      "Kardeşim kardeşim bağlantı hatası verdi diyor sistem geri gidip tekrar giriş yaparmısın"
    );
  });

  app.get(
    "/callback",
    passport.authenticate("discord", { failureRedirect: "/autherror" }),
    async (req, res) => {
      if (req.session.backURL) {
        const url = req.session.backURL;
        req.session.backURL = null;
        res.redirect(url);
      } else {
        res.redirect("/");
      }
    }
  );
  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs");
  });
  app.get("/add", checkAuth, (req, res) => {
    renderTemplate(res, req, "add.ejs");
  });
  app.get("/404", (req, res) => {
    renderTemplate(res, req, "404.html");
  });
   
  app.post("/add", checkAuth, (req, res) => {
    let ayar = req.body;
    let link = ayar["link"];
    if (!ayar["link"]) return res.send("Link'i doldurmadın");

    /*     let ekleyen = "";
      let dict =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for (var i = 0; i < 18; i++) {
        ekleyen =
          ekleyen + dict.charAt(Math.floor(Math.random() * dict.length));
      }*/
 if(db.get("linkler").map(z => z.url).includes(link)) {
      return res.send("Kardeş zaten var ne ekliyip sistemi zorlarlıştırcan");
    } else {
      db.push("linkler", { url: link, owner: req.user.id });
      res.send("eklendi " + req.user.id);
    }
  });

  const listener = app.listen(process.env.PORT, () => {
    console.log("Panel şu portla başlatıldı:" + listener.address().port);
  });
  console.log(`Logined`);
});
//console.log(db.get("linkler").map(z => z.url).includes("https://thyke-.glitch.me/")
/*client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "u.add") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("<:asuna_no:732219380795965471> Already Available!")
    message.channel.send("<:asuna_yes:732219381085503529> Successful!");
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    return message.channel.send("<:asuna_no:732219380795965471> " + e)
  })
  }
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "u.say") {
  var link = spl[1]
 message.channel.send(`${db.get("linkler").length} / ${client.guilds.size}`)
}})


*/
const Discord = require("discord.js");

/*client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "u.help") {
let embed = new Discord.RichEmbed()
.setColor('#4ca74c')
.addField(`Uptime Bot v1.0 Help`, `Includes a system that keeps uptime bot glitch sites open 24/7. The links in the system operate 24/7 without any maintenance.`)
.addField(`General Commands`,`

\`u.help\` - Displays the help menu.
\`u.add\` - Adds the link you specified to the system.
\`u.say\` - It shows the number of links in the system.
`)
.addField(`Links`, `[OnlyCode](https://discord.gg/qVzp2cm)
[Add to Server](https://discord.com/oauth2/authorize?client_id=727978641702649966&scope=bot&permissions=8)
[Support Server](https://discord.gg/axczJaR)`)
.setThumbnail(client.user.avatarURL)
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`2020 © Uptime | Coded by MertBhey, Edited by Alfonzo.`, client.user.avatarURL)
return message.channel.send(embed);
    }
 *
})*/

/*client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "u.help") {
message.channel.send(`**Uptime Bot Commands v1.0**

\`u.help\` - Displays the help menu.
\`u.add\` - Adds the link you specified to the system.
\`u.say\` - It shows the number of links in the system.

2020 © Uptime | Coded by MertBhey, Edited by Alfonzo.
`)
  }
 
})*/

/*client.on("message", async message => {

  if(!message.content.startsWith("u.eval")) return;
  if(!["689169122604744833","689169122604744833"].includes(message.author.id)) return;
  var args = message.content.split("u.eval")[1]
  if(!args) return message.channel.send("<:asuna_no:732219380795965471> ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })
  */
const log = message => {
  console.log(`${message}`);
};

