# XML

# `XML`

Extensible Markup Language.

## Introduction

* XML files have the `.xml` file extension
* flexible text format for representing structured data
* allows definition of custom tags *(extremely similar to HTML)* and document structures
* designed to be both human-readable and machine-readable
* used for web services, configuration files, data interchange and storage

## Quickstart

Below is a sample XML file.

```
<?xml version="1.0" encoding="UTF-8"?>
<library>
    <book>
        <title>XML Developer's Guide</title>
        <author>Gambardella, Matthew</author>
        <genre>Computer</genre>
        <price>44.95</price>
        <pub_date>2000-10-01</pub_date>
        <description>An in-depth look at creating applications with XML.</description>
    </book>
    <book>
        <title>Midnight Rain</title>
        <author>Ralls, Kim</author>
        <genre>Fantasy</genre>
        <price>5.95</price>
        <pub_date>2000-12-16</pub_date>
        <description>A former carpenter turned author is suddenly thrust into a world of magic.</description>
    </book>
    <book>
        <title>Maeve Ascendant</title>
        <author>O'Brien, William</author>
        <genre>Science Fiction</genre>
        <price>29.95</price>
        <pub_date>2001-05-21</pub_date>
        <description>A high-stakes story about the race to control a powerful new technology.</description>
    </book>
    <book>
        <title>The Hobbit</title>
        <author>Tolkien, J.R.R.</author>
        <genre>Fantasy</genre>
        <price>15.95</price>
        <pub_date>1937-09-21</pub_date>
        <description>Bilbo Baggins goes on an unexpected journey with a group of dwarves.</description>
    </book>
</library>
```

Here,

* `<library>` is the **root element** containing all book entries
* `<book>` represents an individual book entry
* `<title>`, `<author>`, `<genre>`, `<price>`, `<pub_date>`, `<description>` are all **child elements** providing details about each book

XML entries can then be called from a variety of programming languages using XML Path Language *(XPath)*.

Below are some sample XPath expressions that can be used to call specific entries.

*(Note that XPath expressions can also be used to call HTML elements since HTML and XML share many similarities.)*

1. ALL book titles

```
/library/book/title
```

1. Author of the first book

```
/library/book[1]/author
```

1. ALL books with the genre *"Fantasy"*

```
/library/book[genre='Fantasy']
```

1. Price of the book titled *"Maeve Ascendant"*

```
/library/book[title='Maeve Ascendant']/price
```

1. Publication date of the last book

```
/library/book[last()]/pub_date
```

1. Description of the book with the highest price

```
/library/book[price = max(/library/book/price)]/description
```

1. ALL book elements

```
/library/book
```

1. Titles and authors of ALL books

```
/library/book/title | /library/book/author
```

## More on

* [learn XML in y minutes](https://learnxinyminutes.com/docs/xml/)
* [XML documentation](https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction)
* [xml.com](https://www.xml.com/)
* [XML for the uninitiated](https://support.microsoft.com/en-us/office/xml-for-the-uninitiated-a87d234d-4c2e-4409-9cbc-45e4eb857d44) by Microsoft Support
* [XML Tutorial](https://www.w3schools.com/xml/default.ASP) by W3Schools
* [Advantages of XML](https://www.ibm.com/docs/en/i/7.3?topic=introduction-advantages-xml) by IBM
* [What's the point of XML?](https://www.reddit.com/r/learnprogramming/comments/np92a0/whats_the_point_of_xml/) by r/learnprogramming
* [XML, what is it good for?](https://stackoverflow.com/questions/4229113/xml-what-is-it-good-for) by Stack Overflow
* [XPath documentation](https://developer.mozilla.org/en-US/docs/Web/XPath)
* [XPath Syntax Tutorial](https://www.w3schools.com/xml/xpath_syntax.asp) by W3Schools
* [What is XPath | How to create XPath | for Beginners](https://youtu.be/U-MZJ6rbqi4?si=-hj4HCgVjualhR7q) by Automation Step by Step
* [Learn XPath in 5 minutes — A tutorial for beginners](https://medium.com/@sunwrn/learn-xpath-in-5-minutes-a-tutorial-for-beginners-3a29925c9178) by Sun Weiran
* [A Comprehensive XPath Tutorial – XML Path Language](https://www.softwaretestinghelp.com/xml-path-language-xpath-tutorial/) by Sruthy from Software Testing Help
