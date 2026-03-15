from flask import Flask, render_template
from telegram import InlineQueryResultGame, Update
from telegram.ext import ApplicationBuilder, InlineQueryHandler, ContextTypes
import threading

TOKEN = "8665981215:AAFUIQHzg1ek9IJ5i1RXpZXMK4vAZg92Rsg"

app = Flask(__name__)

@app.route("/")
def game():
    return render_template("index.html")

async def inline_query(update: Update, context: ContextTypes.DEFAULT_TYPE):

    results = [

        InlineQueryResultGame(
            id="game1",
            game_short_name="bike_race"
        ),

        InlineQueryResultGame(
            id="game2",
            game_short_name="bike_race"
        )

    ]

    await update.inline_query.answer(results, cache_time=0)

telegram_app = ApplicationBuilder().token(TOKEN).build()
telegram_app.add_handler(InlineQueryHandler(inline_query))

def run_bot():
    telegram_app.run_polling()

if __name__ == "__main__":
    threading.Thread(target=run_bot).start()
    app.run(host="0.0.0.0", port=10000)
