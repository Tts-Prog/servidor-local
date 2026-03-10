countries =["America", "Canada", "India", "Australia", "China",  "Chile", "California"]


for c in countries: 
    if c.startswith("C"):
        countries.remove(c)

print(countries)


# 