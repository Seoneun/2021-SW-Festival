from app import App
from view.scrape_view import ScrapeView
# from .view import upload_view
# from .view import download_view

app = App([ScrapeView()])

app2 = app.app

@app2.cli.command()
def show_routes():
    rules = []
    for rule in app.url_map.iter_rules():
        methods = ','.join(sorted(rule.methods))
        rules.append((rule.endpoint, methods, str(rule)))

    sort_by_rule = operator.itemgetter(2)
    for endpoint, methods, rule in sorted(rules, key=sort_by_rule):
        route = '{:50s} {:25s} {}'.format(endpoint, methods, rule)
        print(route)

app.run()
