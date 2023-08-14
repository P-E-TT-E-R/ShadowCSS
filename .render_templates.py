from jinja2 import Environment, PackageLoader, select_autoescape
import os, minify_html

env = Environment(
    loader=PackageLoader("src"),
    autoescape=select_autoescape()
)

files = {}
for fname in os.listdir("./src/templates"):
    if os.path.isfile("./src/templates/"+fname):
        template = env.get_template(fname)
        with open("./src/templates/"+fname) as f:
            files[fname] = minify_html.minify(template.render(), minify_js=True, remove_processing_instructions=True)

for fname, value in files.items():
    with open("./src/"+fname,"w") as f:
        f.write(value)