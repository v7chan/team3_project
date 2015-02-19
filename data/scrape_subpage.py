import re
import urllib2

# Define function which will crawl the nutrition page of each meal
def eachpage (arg1):
  data = {}

  # Get page source code acting as a web browser
  user_agent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.63 Safari/534.3'
  headers = { 'User-Agent' : user_agent }
  url = 'http://hdh.ucsd.edu/diningmenus/' + arg1
  req = urllib2.Request(url, None, headers)
  html = urllib2.urlopen(req)

  meal_regex = re.compile(r'(?<=\"displayName\"\>)(.*?)(?=\<\/span\>)')
  ingredients_regex = re.compile(r'(?<=\"lblIngredientList\"\>)(.*?)(?=\<\/span\>)')
  servingsize_regex = re.compile(r'(?<=Serving\sSize\&nbsp\;\s)(.*?)(?=\<)')
  calories_regex = re.compile(r'(?<=Calories\&nbsp\;\s)(.*?)(?=\<)')
  caloriesfromfat_regex = re.compile(r'(?<=Calories\sfrom\sFat\&nbsp\;\s)(.*?)(?=\<)')
  totalfat_regex = re.compile(r'(?<=Total\sFat\&nbsp\;)')
  satfat_regex = re.compile(r'(?<=Sat\.\sFat\s)(.*?)(?=\<)')
  transfat_regex = re.compile(r'(?<=Trans\sFat\s)(.*?)(?=\<)')
  cholesterol_regex = re.compile(r'(?<=Cholesterol\s)(.*?)(?=\<)')
  sodium_regex = re.compile(r'(?<=Sodium\s)(.*?)(?=\<)')
  totalcarb_regex = re.compile(r'(?<=Tot\.\sCarb\.)')
  dietaryfiber_regex = re.compile(r'(?<=Dietary\sFiber\s)(.*?)(?=\<)')
  sugars_regex = re.compile(r'(?<=Sugars\s)(.*?)(?=\<)')
  protein_regex = re.compile(r'(?<=Protein\s)(.*?)(?=\<)')

  #servingsize calories caloriesfromfat totalfat satfat transfat cholesterol sodium totcarb dietaryfiber sugars protein
  meal = ingredients = servingsize = calories = caloriesfromfat = totalfat = satfat = transfat = cholesterol = sodium = totcarb = dietaryfiber = sugars = protein = waittime = ''

  totalfat_flag = totalcarb_flag = 0

  for line in html:
    meal_exists = re.search(meal_regex, line)
    servingsize_exists = re.search(servingsize_regex, line)
    calories_exists = re.search(calories_regex, line)
    ingredients_exists = re.search(ingredients_regex, line)
    caloriesfromfat_exists = re.search(caloriesfromfat_regex, line)
    totalfat_exists = re.search(totalfat_regex, line)
    satfat_exists = re.search(satfat_regex, line)
    transfat_exists = re.search(transfat_regex, line)
    cholesterol_exists = re.search(cholesterol_regex, line)
    sodium_exists = re.search(sodium_regex, line)
    totalcarb_exists = re.search(totalcarb_regex, line)
    dietaryfiber_exists = re.search(dietaryfiber_regex, line)
    sugars_exists = re.search(sugars_regex, line)
    protein_exists = re.search(protein_regex, line)
    if meal_exists:
      meal = meal_exists.group(0)
    if servingsize_exists:
      servingsize = servingsize_exists.group(0)
    if calories_exists:
      calories = calories_exists.group(0)
    if ingredients_exists:
      ingredients = ingredients_exists.group(0)
    if caloriesfromfat_exists:
      caloriesfromfat = caloriesfromfat_exists.group(0)
    if totalfat_flag:
      totalfat = "".join(line.split())
      totalfat_flag = 0
    if totalfat_exists:
      totalfat_flag = 1
    if satfat_exists:
      satfat = satfat_exists.group(0)
    if transfat_exists:
      transfat = transfat_exists.group(0)
    if cholesterol_exists:
      cholesterol = cholesterol_exists.group(0)
    if sodium_exists:
      sodium = sodium_exists.group(0)
    if totalcarb_flag:
      totalcarb = "".join(line.split())
      totalcarb_flag = 0
    if totalcarb_exists:
      totalcarb_flag = 1
    if dietaryfiber_exists:
      dietaryfiber = dietaryfiber_exists.group(0)
    if sugars_exists:
      sugars = sugars_exists.group(0)
    if protein_exists:
      protein = protein_exists.group(0)

  # Prepare nutrition info as numbers
  protein_num = re.sub(r'[^\d.]+', '', protein)
  totalfat_num = re.sub(r'[^\d.]+', '', totalfat)
  if len(protein_num) == 0:
    protein_num = -1
  else:
    protein_num = float(protein_num)
  if len(totalfat_num) == 0:
    totalfat_num = -1
  else:
    totalfat_num = float(totalfat_num)

  # Dynamically determine goals using nutrition info
  goals = []
  if protein_num >= 0 and totalfat_num >= 0:
    if protein_num > 15.0 and totalfat_num <= 35.0:
      goals.append("Gain Lean Muscle")
    if totalfat_num <= 35.0 and totalfat_num > 10.0:
      goals.append("Maintain Weight")
    if totalfat_num <= 10.0:
      goals.append("Lose Weight")
    if totalfat_num > 35.0:
      goals.append("Gain Weight")

  if len(ingredients) < 50:
    waittime = 5
  elif len(ingredients) >= 180:
    waittime = 15
  else:
    waittime = 10

  data['meal'] = meal
  data['waittime'] = waittime
  data['goals'] = goals
  data['ingredients'] = ingredients
  data['servingsize'] = servingsize
  data['calories'] = calories
  data['caloriesfromfat'] = caloriesfromfat
  data['totalfat'] = totalfat
  data['satfat'] = satfat
  data['transfat'] = transfat
  data['cholesterol'] = cholesterol
  data['sodium'] = sodium
  data['totalcarb'] = totalcarb
  data['dietaryfiber'] = dietaryfiber
  data['sugars'] = sugars
  data['protein'] = protein

  # data = [meal, ingredients, servingsize, calories, caloriesfromfat, totalfat, satfat, transfat, cholesterol, sodium, totalcarb, dietaryfiber, sugars, protein]

  return data