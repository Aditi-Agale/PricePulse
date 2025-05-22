from apscheduler.schedulers.background import BackgroundScheduler
from scraper import scrape_all_products

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(scrape_all_products, 'interval', hours=1)
    scheduler.start()
