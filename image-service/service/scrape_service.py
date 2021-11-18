import requests
from bs4 import BeautifulSoup

class ScrapeService:
    def __init__(self,keyword):
        self.keyword = keyword
    
    def get_urls(self):
        keyword = self.keyword
        response = requests.get(f'https://www.google.com/search?q={keyword}&sxsrf=AOaemvI-RGKlR1G7snEPVwMklWAwWIrhSQ:1635274830710&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjbyJO74ejzAhWVNaYKHcWYDL4Q_AUoAXoECAEQAw&cshid=1635274861183725&biw=1848&bih=981&dpr=1')
        html = response.text
        soup = BeautifulSoup(html,'html.parser') 
        images = list(filter(lambda image: 'gif' not in image['src'],soup.select('img')))
        urls = []
        # 이미지 링크만 추출
        for image in images:
            urls.append(image['src'])
        return urls

    