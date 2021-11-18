from flask import Blueprint,Response,request
import json
from service.scrape_service import ScrapeService

class ScrapeView:
    path = '/image'
    router = Blueprint('scrape_view',__name__,url_prefix='/api')
    @router.route(f'{path}',methods=["GET"])
    def get_images():
        keyword = request.args.get('keyword')
        urls = ScrapeService(keyword).get_urls()
        response = {
            'urls' : urls
        }
        # json 응답
        return Response(json.dumps(response), mimetype='application/json')