import json
import pandas as pd
import numpy as np

def parser(row):
    data=dict(row['kingdom'])
    row['name'] = data['name']
    row['level'] = data['level']
    row['power'] = data['power']
    row['continent'] = data['worldId']
    return row

def drop_continent(df, continent):
    index = df[df['continent'] != continent].index
    df = df.drop(index)
    return df

def drop_by_lvl(df, lvl):
    index = df[df['level'] >= lvl].index
    df = df.drop(index)
    return df

def process_data():
    with open('data.json', 'r') as file:
        data = json.load(file)
    df = pd.DataFrame(data["ranking"])
    df['name'] = np.nan
    df['level'] = np.nan
    df['power'] = np.nan
    df['continent'] = np.nan

    df = df.apply(parser, axis=1)

    df.drop('kingdom',  axis=1, inplace=True)

    data = df.to_dict(orient='records')

    return data








# Example usage (assuming `data` is loaded from your source)
#processed_df = process_data(data, continent="cont", level=33)
#print(processed_df.to_json())
