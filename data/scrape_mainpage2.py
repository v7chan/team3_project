# -*- coding: utf-8 -*-

import re
import json
import urllib2
from scrape_subpage2 import eachpage

# Define dining hall URLs (re-initialize req-url and re-execute thie script to get results for each dining hall)
revelle = 'http://hdh.ucsd.edu/diningmenus/default.aspx?i=64'
village = 'http://hdh.ucsd.edu/diningmenus/default.aspx?i=27'
muir = 'http://hdh.ucsd.edu/diningmenus/default.aspx?i=32'
marshall = 'http://hdh.ucsd.edu/diningmenus/default.aspx?i=06'
sixth = 'http://hdh.ucsd.edu/diningmenus/default.aspx?i=38'
req_url = sixth

# Get page source code acting as a web browser
user_agent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.63 Safari/534.3'
headers = { 'User-Agent' : user_agent }
req = urllib2.Request(req_url, None, headers)
html = urllib2.urlopen(req)

# Define regular expression match strings
dailyspecials_regex = re.compile(r'Daily\sSpecials')
specialmenu_regex = re.compile(r'MenuListing\_displayDateSpecial')
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
  "Revelle College":"Revelle College",
  "The Strand at The Village East 858.822.4275":"The Village",
  "Muir College, located below Pines":"Muir College",
  "Thurgood Marshall Activity Center":"Marshall College",
  "See map for location of service":"Sixth College"
}
app_address = {
  "Revelle College":"64+Degrees,La+Jolla,CA+92093",
  "The Strand at The Village East 858.822.4275":"The+Bistro,La+Jolla,CA+92093",
  "Muir College, located below Pines":"Roots,9500+Gilman+Dr,La+Jolla,CA+92093",
  "Thurgood Marshall Activity Center":"Goody's+Place+and+Market,+La+Jolla,CA+92037",
  "See map for location of service":"32.8781071,-117.2334346"
}

# Define output file which will contain JSON & temporary JSON object
output = open("scrape_output.json", "w")
obj = []

# Read source code line by line
for line in html:
  dailyspecials_exists = re.search(dailyspecials_regex, line)
  specialmenu_exists = re.search(specialmenu_regex, line)
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
    if specialmenu_exists:
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