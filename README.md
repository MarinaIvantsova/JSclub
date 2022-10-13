# Meeting №1
* Первая встреча клуба прошла 21 сентября 2022 года
* Цель превой встречи: познакомиться участникам и создать каркас сайта клуба на github pages.
* Фаундер клуба Марина Иванцова создала [репозиторий](https://github.com/MarinaIvantsova/JSclub),
* Были созданы index.html и style.css и загружены в репозиторий, теперь пришло время 
настраивать gh pages.
* GHPages >>> Quickstart >>>
(хостинг статических файлов)
Репозиторий>> settings>>> pages>>>выбираем ветку master >>> save
( Гитхаб забирает статические файлы из определенной ветки , кладет их на свой хостинг и отдает 
их)
После этого повляется ссылка на сайт MarinaIvantsova.github.io
* Каждый участник клуба себе клонировал репозиторий. 
Клонировать репозиторий можно так:
1. Скопировать адрес репозитория во вкладке CODE
2. Открыть терминал в вашем редакторе
3. Набрать в терминале строку git clone “адрес репозитория”
4. Появляются папки из репо , в которых надо внести изменения
5. git checkout -b “ название ветки” -создаем свою ветку
6. Набираем в терминале git status и убеждаемся , что изменения произошли (modified, remove)
7. git add .( добавляем все изменения на индексацию)
8. git commit -m “название коммита”
9. git push запушили изменения в удаленный репо
* Домен привязывается к репозиторию, а не к аккаунту
* Сейчас репо привязана к MarinaIvantsova.github.io, 
n 
Custom domain>>> coding-club.org >>> save
Идем к DNS провайдеру и создаем CNAME которое будет привязывать наш поддомен к 
дефолтному домену нашего сайта
Открываем GODADDY открываем CNAME и редактируем.
CNAME – оригинальное имя. 
сoding-club.org будет alias(ссылка ) на MarinaIvantsova.github.io
Type: CNAME
Name : coding-club.org
Value: MarinaIvantsova.github.io
TTL (time to live – время жизни IP-пакетов определяющее скорость обновления) 30min
Настраиваем “A” запись .Берем IP github 195.199.109.153 и вставляем в строку VALUE
*  идем на GHP и ставим галочку на Enforce HTTPS >>>> GH выписывает сертификат и сохраняет 
его у себя, после чего при запросе HTTPS coding-club.org GH обслужит его корректно

ИТОГО:

У нас есть статические файлы которые лежат в репозитории … , когда мы что-то делаем в 
репозитории GH автоматически переносит это на MarinaIvantsova.github.io. 

В то же время было приобретено доменное имя у провайдера и привязано к IP адресу GH, 
настроено так , что бы coding-club.org === MarinaIvantsova.github.io

Фаундер проекта сделал всех участников клуба контрибьюторами и теперь каждый участник 
имеет право вносить изменения в проект.

Переходим в GH в раздел PULL request >>> new PULL request>>> выбираем ветку в которую 
вливаем изменения >>> create PR
Проверяем изменения review changes
Замержим изменения 

При добавлении нового коммита могут возникнуть конфликты, с помощью кнопки resolve conflicts
мы их решаем. 
А именно разные отступы, одинаковый контент и др.. Правим конфликты вручную