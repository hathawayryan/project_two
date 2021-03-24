#!/usr/bin/env python
# coding: utf-8

# In[3]:


import json
import pandas as pd
import plotly.express as px


# In[ ]:


import plotly.io as pio
pio.renderers.default = 'chrome'


# In[5]:


texas_counties = json.load(open("Texas_County_Boundaries.geojson"))


# In[6]:


county_id_map ={}
for feature in texas_counties['features']:
    feature['id'] = feature['properties']['FIPS_ST_CNTY_CD']
    county_id_map[feature['properties']['CNTY_NM']] = feature['id']


# In[7]:


df = pd.read_csv("texas.csv")
df['id'] = df['County'].apply(lambda x: county_id_map[x])
df.head()


# In[ ]:


fig = px.choropleth(df, locations="id", geojson=texas_counties, color='2019')
fig.show()


# In[ ]:





# In[ ]:




