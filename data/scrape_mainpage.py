# -*- coding: utf-8 -*-

import re
import json
import urllib2
from scrape_subpage import eachpage

# Define dining hall URLs (re-initialize req-url and re-execute thie script to get results for each dining hall)
erc = 'http://hdh.ucsd.edu/diningmenus/default.aspx?i=18'
warren = 'http://hdh.ucsd.edu/diningmenus/default.aspx?i=24'
sixth = 'http://hdh.ucsd.edu/diningmenus/default.aspx?i=11'
marshall = 'http://hdh.ucsd.edu/diningmenus/default.aspx?i=05'
muir = 'http://hdh.ucsd.edu/diningmenus/default.aspx?i=01'
req_url = erc

# Get page source code acting as a web browser
user_agent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.63 Safari/534.3'
headers = { 'User-Agent' : user_agent }
req = urllib2.Request(req_url, None, headers)
html = urllib2.urlopen(req)

# Define regular expression match strings
dailyspecials_regex = re.compile(r'Daily\sSpecials')
fullmenu_regex = re.compile(r'MenuListing\_displayDateFull')
meal_regex = re.compile(r'(?<=\"\_blank\"\>)(.*?)(?=\&nbsp\;\&nbsp\;)')
cost_regex = re.compile(r'(?<=\&nbsp\;\&nbsp\;\(\$)(.*?)(?=\)\<)')
restaurant_regex = re.compile(r'(?<=\"HoursLocations_locationName\"\>)(.*?)(?=\<\/h2\>)')
location_regex = re.compile(r'(?<=\"HoursLocations_descrip1\"\>)(.*?)(?=\<\/p\>)')
link_regex = re.compile(r'(?<=href\=\")(.*?)(?=\")')
vegetarian_regex = re.compile(r'vegetarian18\.png')
vegan_regex = re.compile(r'vegan18\.png')
glutenfree_regex = re.compile(r'glutenfree18\.png')
meal = cost = restaurant = location = ''
dailyspecials_flag = 0

# Define college aliases and Google address string associations in a dictionary
app_location = {
  "Eleanor Roosevelt College":"ERC College",
  "Earl Warren College":"Warren College",
  "The Matthews &amp; Sixth College Apartments complex": "Sixth College",
  "Thurgood Marshall College":"Marshall College",
  "Muir College":"Muir College"
}
app_address = {
  "Revelle College":"64+Degrees,9500+Gilman+Drive,La+Jolla,CA+92093",
  "Eleanor Roosevelt College":"Café+Ventanas,La+Jolla,CA+92092",
  "Earl Warren College":"Canyon+Vista,La+Jolla,CA+92093",
  "The Matthews &amp; Sixth College Apartments complex": "Foodworx,La+Jolla,CA+92093",
  "Thurgood Marshall College":"Oceanview+Terrace+Restaurant,La+Jolla,CA+92037",
  "Muir College":"Stewart+Commons,San+Diego,CA+92161"
}

# Define output file which will contain JSON & temporary JSON object
output = open("scrape_output.json", "w")
obj = []

# Read source code line by line
for line in html:
  dailyspecials_exists = re.search(dailyspecials_regex, line)
  fullmenu_exists = re.search(fullmenu_regex, line)
  meal_exists = re.search(meal_regex, line)
  cost_exists = re.search(cost_regex, line)
  restaurant_exists = re.search(restaurant_regex, line)
  location_exists = re.search(location_regex, line)
  vegetarian_exists = re.search(vegetarian_regex, line)
  vegan_exists = re.search(vegan_regex, line)
  glutenfree_exists = re.search(glutenfree_regex, line)
  link_exists = re.search(link_regex, line)
  if dailyspecials_exists:
    dailyspecials_flag = 1
  if dailyspecials_flag:
    if fullmenu_exists:
      dailyspecials_flag = 0
  else:
    if restaurant_exists:
      restaurant = restaurant_exists.group(0)
    if location_exists:
      location = location_exists.group(0)
    if meal_exists:
      meal = meal_exists.group(0)
      cost = cost_exists.group(0)
      data = []
      restrictions = []
      if vegetarian_exists:
        restrictions.append("Vegetarian")
        restrictions.append("Pescetarian")
      if vegan_exists:
        restrictions.append("Vegan")
        restrictions.append("Vegetarian")
        restrictions.append("Pescetarian")
      if glutenfree_exists:
        restrictions.append("Gluten Free")
      if link_exists:
        link = link_exists.group(0)
        data = eachpage(link)
      obj.append(
        {
          "name": meal,
          "restaurant": restaurant,
          "googleAddress": app_address[location],
          "cost": cost,
          "waitTime": data['waittime'],
          "location": app_location[location],
          "description": "After you try our " + data['meal'] + ", we know you will be extremely satisfied!",
          "goals": data['goals'],
          "restrictions": restrictions,
          "nutrition": {
            "ingredients": data['ingredients'],
            "information": {
              "Serving Size": data['servingsize'],
              "Calories": data['calories'],
              "Calories from Fat": data['caloriesfromfat'],
              "Total Fat": data['totalfat'],
              "Saturated Fat": data['satfat'],
              "Trans Fat": data['transfat'],
              "Cholesterol": data['cholesterol'],
              "Sodium": data['sodium'],
              "Total Carbohydrates": data['totalcarb'],
              "Dietary Fiber": data['dietaryfiber'],
              "Sugars": data['sugars'],
              "Protein": data['protein']
            }
          }
        })

# Spit JSON into output file
with output as outfile:
  json.dump(obj, outfile, indent=2)