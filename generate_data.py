import json
import random
import math

random.seed(42)

years = list(range(2021, 2034))

def gen_time_series(base, cagr, noise=0.03):
    ts = {}
    for i, y in enumerate(years):
        growth = (1 + cagr) ** i
        val = base * growth * (1 + random.uniform(-noise, noise))
        ts[str(y)] = round(val, 1)
    return ts

value_bases = {
    "By Product Type": {
        "Indoor Fixed Security Cameras": 420,
        "Outdoor Fixed Security Cameras": 580,
        "Video Doorbell Cameras": 350,
        "Floodlight and Spotlight Security Cameras": 280,
        "Pan-Tilt-Zoom Security Cameras": 190
    },
    "By Solution Model": {
        "Self-Managed Security Camera Solutions (DIY)": 1100,
        "Professionally Managed Security Camera Solutions": 720
    },
    "By End Use": {
        "Single-Family Homes": 650,
        "Multi-Family Homes, Apartments and Condominiums": 380,
        "Small Offices": 210,
        "Retail Stores": 195,
        "Restaurants, Cafes and Foodservice Outlets": 145,
        "Warehouses and Storage Facilities": 240
    },
    "By Power Type": {
        "Hardwired Cameras": 380,
        "Battery-Powered Cameras": 520,
        "Solar-Assisted Cameras": 310,
        "Power over Ethernet (PoE) Cameras": 610
    },
    "By Video Resolution": {
        "HD and Full HD": 680,
        "2K": 540,
        "4K and Above": 600
    },
    "By Distribution Channel": {
        "Brand-Owned Direct Online Sales": 350,
        "Third-Party E-Commerce Marketplaces": 480,
        "Consumer Electronics Retail": 320,
        "Home Improvement Retail": 370,
        "Security Dealers, Installers and Integrators": 300
    }
}

volume_bases = {
    "By Product Type": {
        "Indoor Fixed Security Cameras": 12.5,
        "Outdoor Fixed Security Cameras": 15.2,
        "Video Doorbell Cameras": 9.8,
        "Floodlight and Spotlight Security Cameras": 7.1,
        "Pan-Tilt-Zoom Security Cameras": 4.3
    },
    "By Solution Model": {
        "Self-Managed Security Camera Solutions (DIY)": 32.0,
        "Professionally Managed Security Camera Solutions": 16.9
    },
    "By End Use": {
        "Single-Family Homes": 18.5,
        "Multi-Family Homes, Apartments and Condominiums": 10.2,
        "Small Offices": 5.8,
        "Retail Stores": 5.2,
        "Restaurants, Cafes and Foodservice Outlets": 3.9,
        "Warehouses and Storage Facilities": 5.3
    },
    "By Power Type": {
        "Hardwired Cameras": 9.5,
        "Battery-Powered Cameras": 14.8,
        "Solar-Assisted Cameras": 8.2,
        "Power over Ethernet (PoE) Cameras": 16.4
    },
    "By Video Resolution": {
        "HD and Full HD": 20.5,
        "2K": 15.2,
        "4K and Above": 13.2
    },
    "By Distribution Channel": {
        "Brand-Owned Direct Online Sales": 9.8,
        "Third-Party E-Commerce Marketplaces": 13.5,
        "Consumer Electronics Retail": 8.9,
        "Home Improvement Retail": 10.2,
        "Security Dealers, Installers and Integrators": 6.5
    }
}

cagr_map = {
    "By Product Type": {
        "Indoor Fixed Security Cameras": 0.085,
        "Outdoor Fixed Security Cameras": 0.092,
        "Video Doorbell Cameras": 0.11,
        "Floodlight and Spotlight Security Cameras": 0.105,
        "Pan-Tilt-Zoom Security Cameras": 0.078
    },
    "By Solution Model": {
        "Self-Managed Security Camera Solutions (DIY)": 0.10,
        "Professionally Managed Security Camera Solutions": 0.075
    },
    "By End Use": {
        "Single-Family Homes": 0.09,
        "Multi-Family Homes, Apartments and Condominiums": 0.085,
        "Small Offices": 0.08,
        "Retail Stores": 0.088,
        "Restaurants, Cafes and Foodservice Outlets": 0.075,
        "Warehouses and Storage Facilities": 0.095
    },
    "By Power Type": {
        "Hardwired Cameras": 0.055,
        "Battery-Powered Cameras": 0.10,
        "Solar-Assisted Cameras": 0.13,
        "Power over Ethernet (PoE) Cameras": 0.088
    },
    "By Video Resolution": {
        "HD and Full HD": 0.045,
        "2K": 0.095,
        "4K and Above": 0.12
    },
    "By Distribution Channel": {
        "Brand-Owned Direct Online Sales": 0.11,
        "Third-Party E-Commerce Marketplaces": 0.105,
        "Consumer Electronics Retail": 0.065,
        "Home Improvement Retail": 0.075,
        "Security Dealers, Installers and Integrators": 0.07
    }
}

us_share = 0.85
ca_share = 0.15

# Parent-to-children mapping for hierarchical segments
parent_children = {
    "By End Use": {
        "Residential Users": ["Single-Family Homes", "Multi-Family Homes, Apartments and Condominiums"],
        "Small and Light Commercial Users": ["Small Offices", "Retail Stores", "Restaurants, Cafes and Foodservice Outlets", "Warehouses and Storage Facilities"]
    }
}

def sum_children_ts(seg_data, children):
    """Sum time series of children to create parent time series"""
    result = {}
    for yr in years:
        yr_str = str(yr)
        total = sum(seg_data[child][yr_str] for child in children if child in seg_data)
        result[yr_str] = round(total, 1)
    return result

def generate_geo_data(bases, is_value=True):
    result = {}
    for geo_name, share in [("North America", 1.0), ("U.S.", us_share), ("Canada", ca_share)]:
        geo_data = {}
        for seg_type, seg_items in bases.items():
            seg_data = {}
            for seg_name, base_val in seg_items.items():
                adjusted_base = base_val * share
                cagr = cagr_map[seg_type][seg_name]
                if geo_name == "Canada":
                    cagr *= 1.05
                ts = gen_time_series(adjusted_base, cagr)
                seg_data[seg_name] = ts

            # Add parent segment data by summing children
            if seg_type in parent_children:
                for parent_name, children in parent_children[seg_type].items():
                    seg_data[parent_name] = sum_children_ts(seg_data, children)

            geo_data[seg_type] = seg_data

        if geo_name == "North America":
            by_country = {}
            for country in ["U.S.", "Canada"]:
                share_c = us_share if country == "U.S." else ca_share
                total_base = sum(value_bases["By Product Type"].values()) * share_c if is_value else sum(volume_bases["By Product Type"].values()) * share_c
                by_country[country] = gen_time_series(total_base, 0.09)
            geo_data["By Country"] = by_country

        result[geo_name] = geo_data
    return result

value_data = generate_geo_data(value_bases, is_value=True)
volume_data = generate_geo_data(volume_bases, is_value=False)

with open("c:/Users/vrashal/Desktop/Dashboards/DIY/public/data/value.json", "w") as f:
    json.dump(value_data, f, indent=2)

with open("c:/Users/vrashal/Desktop/Dashboards/DIY/public/data/volume.json", "w") as f:
    json.dump(volume_data, f, indent=2)

seg_analysis = {
    "Global": {
        "By Product Type": {
            "Indoor Fixed Security Cameras": {},
            "Outdoor Fixed Security Cameras": {},
            "Video Doorbell Cameras": {},
            "Floodlight and Spotlight Security Cameras": {},
            "Pan-Tilt-Zoom Security Cameras": {}
        },
        "By Solution Model": {
            "Self-Managed Security Camera Solutions (DIY)": {},
            "Professionally Managed Security Camera Solutions": {}
        },
        "By End Use": {
            "Residential Users": {
                "Single-Family Homes": {},
                "Multi-Family Homes, Apartments and Condominiums": {}
            },
            "Small and Light Commercial Users": {
                "Small Offices": {},
                "Retail Stores": {},
                "Restaurants, Cafes and Foodservice Outlets": {},
                "Warehouses and Storage Facilities": {}
            }
        },
        "By Power Type": {
            "Hardwired Cameras": {},
            "Battery-Powered Cameras": {},
            "Solar-Assisted Cameras": {},
            "Power over Ethernet (PoE) Cameras": {}
        },
        "By Video Resolution": {
            "HD and Full HD": {},
            "2K": {},
            "4K and Above": {}
        },
        "By Distribution Channel": {
            "Brand-Owned Direct Online Sales": {},
            "Third-Party E-Commerce Marketplaces": {},
            "Consumer Electronics Retail": {},
            "Home Improvement Retail": {},
            "Security Dealers, Installers and Integrators": {}
        },
        "By Region": {
            "North America": {
                "U.S.": {},
                "Canada": {}
            }
        }
    }
}

with open("c:/Users/vrashal/Desktop/Dashboards/DIY/public/data/segmentation_analysis.json", "w") as f:
    json.dump(seg_analysis, f, indent=2)

print("All data files generated successfully!")
for geo in value_data:
    print(f"  {geo} segment types: {list(value_data[geo].keys())}")
