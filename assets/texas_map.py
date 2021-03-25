import json
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

import plotly.io as pio
pio.renderers.default = "browser"

texas_counties = json.load(open("Texas_County_Boundaries.geojson"))

#a new dictionary that links "id" to the county name

county_id_map = {}

for feature in texas_counties['features']:
    feature["id"] = feature['properties']['FIPS_ST_CNTY_CD']
    county_id_map[feature['properties']['CNTY_NM']] = feature['id']

df = pd.read_csv("medianage.csv")

#https://www.analyticsvidhya.com/blog/2020/03/what-are-lambda-functions-in-python/

df['id'] = df['County'].apply(lambda x: county_id_map[x])

#https://plotly.github.io/plotly.py-docs/generated/plotly.express.choropleth.html:

fig = px.choropleth (df,
                    locations = "id",
                    geojson = texas_counties,
                    color = 'Median Age',
                     hover_name = 'County',
                     hover_data = ['Population'],
                    scope = 'usa',
                       title = "Texas Median age and Population by County-2019"
            
                    )
fig.show()

def return_texas_data():
    texas_counties = json.load(open("Texas_County_Boundaries.geojson"))

    #a new dictionary that links "id" to the county name

    county_id_map = {}

    for feature in texas_counties['features']:
        feature["id"] = feature['properties']['FIPS_ST_CNTY_CD']
        county_id_map[feature['properties']['CNTY_NM']] = feature['id']

    df = pd.read_csv("medianage.csv")

    #https://www.analyticsvidhya.com/blog/2020/03/what-are-lambda-functions-in-python/

    df['id'] = df['County'].apply(lambda x: county_id_map[x])

    #https://plotly.github.io/plotly.py-docs/generated/plotly.express.choropleth.html:

    # fig = px.choropleth (df,
    #                     locations = "id",
    #                     geojson = texas_counties,
    #                     color = 'Median Age',
    #                     hover_name = 'County',
    #                     hover_data = ['Population'],
    #                     scope = 'usa',
    #                     title = "Texas Median age and Population by County-2019"
                
    #                     )
    # fig.show()

    return df

