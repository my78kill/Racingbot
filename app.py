from flask import Flask, send_from_directory
from telegram import Update, InlineQueryResultGame
from telegram.ext import ApplicationBuilder, CommandHandler, InlineQueryHandler, ContextTypes
import threading

TOKEN = "8665981215:AAFUIQHzg1ek9IJ5i1RXpZXMK4vAZg92Rsg"

app = Flask(__name__)

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(".", path)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Type @YourBotName to play Bike Racing!")

async def inline_query(update: Update, context: ContextTypes.DEFAULT_TYPE):
    results = [
        InlineQueryResultGame(
            id="bike_race",
            game_short_name="bike_race"
        )
    ]
    await update.inline_query.answer(results)

telegram_app = ApplicationBuilder().token(TOKEN).build()

telegram_app.add_handler(CommandHandler("start", start))
telegram_app.add_handler(InlineQueryHandler(inline_query))

def run_bot():
    telegram_app.run_polling()

if __name__ == "__main__":
    threading.Thread(target=run_bot).start()
    app.run(host="0.0.0.0", port=10000)