# Scrapy

# `Scrapy`

Complete webscraping toolkit.

## Introduction

* open-source and collaborative web crawling framework specifically for Python
* powerful tool for data mining, automation, and building custom web crawlers
* capable of handling large-scale scraping tasks because base is built on Twisted *(asynchronous networking framework)*
* extracts website data, processes it, then stores it to the following target outputs
  * `.json` *(JSON)*: lightweight and widely-used data interchange format ideal for web applications and APIs
  * `.csv` *(CSV)*: comma-separated values is a simple format used to store tabular data, compatible with applications like Excel, Google Sheets, and most databases
  * `.xml` *(XML)*: extensible markup language is a structured format useful for data interchange paritcularly for legacy systems and services
  * `.sql` *(SQL)*: structured query language is a descriptive language used to interact with relational databases such as SQLite, MySQL and PostgreSQL
  * `.py` *(Python)*: scraped data can be stored in Python's data structures *(lists, dictionaries, custom objects)* for custom processing
  * ElasticSearch: a powerful search engine ideal for handling large volumes of data and complex queries
  * MongoDB: a NoSQL database well-suited for storing unstructured or semi-structured data
  * Direct API calls: scraped data can be directly piped to a REST API or other service endpoints

## Installation

```
$ pip install scrapy
```

## Quickstart

Create a new scrapy project with the below command.

```
$ scrapy startproject myproject # creates a new Scrapy project in the current directory
```

A spider is a class that defines how to follow links through a website and extract data from its webpages.

The below sample code creates a simple spider that scrapes quotes from the website [*Quotes to Scrape*](http://quotes.toscrape.com/).

```
import scrapy

class QuotesSpider(scrapy.Spider):
    name = "quotes"
    start_urls = [
        'http://quotes.toscrape.com/',
    ]

    def parse(self, response):
        for quote in response.css('div.quote'):
            yield {
                'text': quote.css('span.text::text').get(),
                'author': quote.css('small.author::text').get(),
                'tags': quote.css('div.tags a.tag::text').getall(),
            }

        next_page = response.css('li.next a::attr(href)').get()
        if next_page is not None:
            yield response.follow(next_page, self.parse)
```

You can then run your spider with the below command.

```
$ scrapy crawl quotes -o quotes.json # runs the spider and outputs the scraped data to a quotes.json file
```

You can further customize your spider within the `settings.py` file.

## More on

* [scrapy.org](https://scrapy.org/)
* [scrapy](https://github.com/scrapy/scrapy) Github repository
* [Scrapy documentation](https://docs.scrapy.org/en/latest/)
* [Scrapy Spiders documentation](https://docs.scrapy.org/en/latest/topics/spiders.html)
* [Download Scrapy](https://scrapy.org/download/)
* [Scrapy resources](https://scrapy.org/resources/)
* [Scrapy Course – Python Web Scraping for Beginners](https://youtu.be/mBoX_JCKZTE?si=0CbkuRH5xegUs0zw) by freeCodeCamp.org
* [What are your thoughts on scrapy](https://www.reddit.com/r/webscraping/comments/wypsg4/what_are_your_thoughts_on_scrapy/) by r/webscraping
* [Scrapy at a glance](https://docs.scrapy.org/en/latest/intro/overview.html)
* [Difference between BeautifulSoup and Scrapy crawler?](https://stackoverflow.com/questions/19687421/difference-between-beautifulsoup-and-scrapy-crawler) by Stack Overflow
* [When should you use Scrapy over BeautifulSoup *(...and what's the difference anyway?)*](https://hexfox.com/p/scrapy-vs-beautifulsoup/) by Hexfox
* [twisted.org](https://twisted.org/)
