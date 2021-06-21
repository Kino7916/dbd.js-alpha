const Discordjs = require("discord.js")

class AoiError {
  constructor(ErrorMessage, problem) {
    this.msg = ErrorMessage;
    this.problem = problem;
    this.suppressed = false;
  }

  getLine(code) {
    const Lines = code.split("\n");
    let index = -1;
    
    for (const line of Lines) {
      const i = line.indexOf(this.problem);

      if (i >= 0) {
        index = i ;
        break;
      }
    }

    return index
  }
  
  getMessageEmbed() {
    this.msg = this.msg.replace("{error}", this.problem);
    const embed = new Discordjs.MessageEmbed();
    
    if (this.msg.includes("{title:")) {
      const title = this.msg.split("{title:")[1].split("}")[0];
      this.msg = this.msg.replace(`{title:${title}}`, "")

      embed.setTitle(title)
    }
    
    if (this.msg.includes("{description:")) {
      const desc = this.msg.split("{description:")[1].split("}")[0];
      this.msg = this.msg.replace(`{description:${desc}}`, "")

      embed.setDescription(desc)
    }
    
    if (this.msg.includes("{footer:")) {
      const footer = this.msg.split("{footer:")[1].split("}")[0]
      this.msg = this.msg.replace(`{footer:${footer}}`, "")

      const [text, url] = footer.split(":")
      embed.setFooter(text, url)
    }
    
    if (this.msg.includes("{thumbnail:")) {
      const thumbnail = this.msg.split("{thumbnail:")[1].split("}")[0]
      this.msg = this.msg.replace(`{thumbnail:${thumbnail}}`, "")
      embed.setThumbnail(thumbnail)
    }
    
    if (this.msg.includes("{image:")) {
      const image = this.msg.split("{image:")[1].split("}")[0]
      this.msg = this.msg.replace(`{image:${image}}`, "")
      embed.setImage(image)
    }

    if (this.msg.includes("{timestamp:")) {
      const ms = this.msg.split("{timestamp:")[1].split("}")[0]
      this.msg = this.msg.replace(`{timestamp:${ms}}`, "")
      embed.setTimestamp(isNaN(new Number(ms)) ? Date.now() : new Number(ms))

    }

    if (this.msg.includes("{author:")) {
      const author = this.msg.split("{author:")[1].split("}")[0]
      this.msg = this.msg.replace(`{author:${author}}`, "")
      const [text, ...url] = author.split(":")
      embed.setAuthor(text, url.join(":"))
    }

    if (this.msg.includes("{color:")) {
      const color = this.msg.split("{color:")[1].split("}")[0]
      this.msg = this.msg.replace(`{color:${color}}`, "")
      embed.setColor(color)
    }

    if (this.msg.includes("{url:")) {
      const url = this.msg.split("{url:")[1].split("}")[0]
      this.msg = this.msg.replace(`{url:${url}}`, "")
      embed.setURL(url)
    }
    
    return embed
  }
  
}

module.exports = AoiError