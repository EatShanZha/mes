# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import time
import datetime
import random
from django.shortcuts import render, redirect, HttpResponse
from android.models import *
import json
from functools import wraps
from xmlrpc import client
from django.http import JsonResponse
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage, InvalidPage


# Create your views here.

# 封装odoo端口
def odoo_webservice(cl, func, obj):
    url = "http://192.168.1.198:8090"
    db = "BXD_ERP"
    # url = "http://192.168.1.86:8069"
    # db = "BXD_ERP_0807"
    username = "admin"
    password = "erpstddata"
    common = client.ServerProxy("{}/xmlrpc/2/common".format(url))
    common.version()
    uid = common.authenticate(db, username, password, {})
    models = client.ServerProxy("{}/xmlrpc/2/object".format(url))
    result = models.execute_kw(db, uid, password, cl, func,
                               ["ss", obj])
    return result


def login(request):
    if request.method == "POST":
        machine_code = str(request.POST.get("machine_code"))
        print(machine_code)
        obj = str({"machine_code": machine_code})
        print(machine_code)
        # Status_obj = Status_record(userAccount=request.POST.get("account"), status="上班", process="精改")
        # Status_obj.save()
        result = odoo_webservice("bxd.process.overall.detailed", "login_verify", obj)
        print(result)
        try:
            if result['page']:
                print(result['page'])
                return HttpResponse(result['page'])
        except:
            return HttpResponse("false")


def register(request):
    if request.method == "POST":
        machine_code = request.POST.get("machine_code")
        print(machine_code)
        try:
            Machine(machine_code=machine_code).save()
            return HttpResponse("true")
        except:
            return HttpResponse("exist")


def gbkc(request, str):
    if request.method == "GET":
        print(str)
        # if result['userName']:
        return JsonResponse({"data": str, "status": "success"})


#
# def check_login(f):
#     @wraps(f)
#     def inner(request,*arg,**kwargs):
#         if request.session.get("is_login")=="1":
#             return f(request,*arg,**kwargs)
#         else:
#             return redirect("/login/")
#     return inner
#
# @check_login
def select(request):
    if request.method == "POST":
        code = request.POST.get("code")
        result = odoo_webservice("bxd.process.overall.detailed", "return_staff", code)
        return render(request, "sample_clothes.html", {"ab": result["name"]})


def video(request):
    if request.method == "GET":
        return render(request, "video.html")


# 登录刷卡workdetail
def sample_clothes(request, machine_code, card_id):
    if request.method == "GET":
        print(card_id)
        print(machine_code)
        obj = str({"card_id": card_id, "machine_code": machine_code})
        result = odoo_webservice("bxd.process.overall.detailed", "return_staff", obj)
        print(result)
        if result["status"] == "erro":
            return render(request, "relogin.html", {"message": result["message"], "status": "erro"})
        result = result["message"]
        Status_obj = Status_record(userAccount=card_id, status="上班", process=result['work_stage'],
                                   userName=result["userName"], station=result["station"])
        Status_obj.save()
        # return JsonResponse({"data": card_id, "status": "success"})
        return render(request, "sample_clothes.html",
                      {"name": result["userName"],
                       "skill": result["job_id"],
                       "card_id": card_id,
                       "machine_code": machine_code,
                       "department": result["department"],
                       "work_stage": result["work_stage"],
                       "station": result["station"]})


# 刷卡登入cdm_clothes
def cdm_clothes(request, machine_code, card_id):
    if request.method == "GET":
        print(card_id)
        print(machine_code)
        obj = str({"card_id": card_id, "machine_code": machine_code})
        result = odoo_webservice("bxd.process.overall.detailed", "return_staff", obj)
        print(result)
        if result["status"] == "erro":
            return render(request, "relogin.html", {"message": result["message"], "status": "erro"})
        result = result["message"]
        Status_obj = Status_record(userAccount=card_id, status="上班", process=result['work_stage'],
                                   userName=result["userName"], station=result["station"])
        Status_obj.save()
        # return JsonResponse({"data": card_id, "status": "success"})
        return render(request, "cdm_clothes.html",
                      {"name": result["userName"],
                       "skill": result["job_id"],
                       "card_id": card_id,
                       "machine_code": machine_code,
                       "department": result["department"],
                       "work_stage": result["work_stage"],
                       "station": result["station"]})


# 刷卡登入cdm_trousers
def cdm_trousers(request, machine_code, card_id):
    if request.method == "GET":
        print(card_id)
        print(machine_code)
        obj = str({"card_id": card_id, "machine_code": machine_code})
        result = odoo_webservice("bxd.process.overall.detailed", "return_staff", obj)
        print(result)
        if result["status"] == "erro":
            return render(request, "relogin.html", {"message": result["message"], "status": "erro"})
        result = result["message"]
        Status_obj = Status_record(userAccount=card_id, status="上班", process=result['work_stage'],
                                   userName=result["userName"], station=result["station"])
        Status_obj.save()
        # return JsonResponse({"data": card_id, "status": "success"})
        return render(request, "cdm_trousers.html",
                      {"name": result["userName"],
                       "skill": result["job_id"],
                       "card_id": card_id,
                       "machine_code": machine_code,
                       "department": result["department"],
                       "work_stage": result["work_stage"],
                       "station": result["station"]})


# 刷卡登入cdl_clothes
def cdl_clothes(request, machine_code, card_id):
    if request.method == "GET":
        print(card_id)
        print(machine_code)
        obj = str({"card_id": card_id, "machine_code": machine_code})
        result = odoo_webservice("bxd.process.overall.detailed", "return_staff", obj)
        print(result)
        if result["status"] == "erro":
            return render(request, "relogin.html", {"message": result["message"], "status": "erro"})
        result = result["message"]
        Status_obj = Status_record(userAccount=card_id, status="上班", process=result['work_stage'],
                                   userName=result["userName"], station=result["station"])
        Status_obj.save()
        # return JsonResponse({"data": card_id, "status": "success"})
        return render(request, "cdl_clothes.html",
                      {"name": result["userName"],
                       "skill": result["job_id"],
                       "card_id": card_id,
                       "machine_code": machine_code,
                       "department": result["department"],
                       "work_stage": result["work_stage"],
                       "station": result["station"]})


# 刷卡登入cdl_trousers
def cdl_trousers(request, machine_code, card_id):
    if request.method == "GET":
        print(card_id)
        print(machine_code)
        obj = str({"card_id": card_id, "machine_code": machine_code})
        result = odoo_webservice("bxd.process.overall.detailed", "return_staff", obj)
        print(result)
        if result["status"] == "erro":
            return render(request, "relogin.html", {"message": result["message"], "status": "erro"})
        result = result["message"]
        Status_obj = Status_record(userAccount=card_id, status="上班", process=result['work_stage'],
                                   userName=result["userName"], station=result["station"])
        Status_obj.save()
        # return JsonResponse({"data": card_id, "status": "success"})
        return render(request, "cdl_trousers.html",
                      {"name": result["userName"],
                       "skill": result["job_id"],
                       "card_id": card_id,
                       "machine_code": machine_code,
                       "department": result["department"],
                       "work_stage": result["work_stage"],
                       "station": result["station"]})


# 刷卡登入serial_number
def serial_number(request, machine_code, card_id):
    if request.method == "GET":
        print(card_id)
        print(machine_code)
        obj = str({"card_id": card_id, "machine_code": machine_code})
        result = odoo_webservice("bxd.process.overall.detailed", "return_staff", obj)
        print(result)
        if result["status"] == "erro":
            return render(request, "relogin.html", {"message": result["message"], "status": "erro"})
        result = result["message"]
        Status_obj = Status_record(userAccount=card_id, status="上班", process=result['work_stage'],
                                   userName=result["userName"], station=result["station"])
        Status_obj.save()
        # return JsonResponse({"data": card_id, "status": "success"})
        return render(request, "serial_number.html",
                      {"name": result["userName"],
                       "skill": result["job_id"],
                       "card_id": card_id,
                       "machine_code": machine_code,
                       "department": result["department"],
                       "work_stage": result["work_stage"],
                       "station": result["station"]})


# 刷卡登入cdf_clothes
def cdf_clothes(request, machine_code, card_id):
    if request.method == "GET":
        print(card_id)
        print(machine_code)
        obj = str({"card_id": card_id, "machine_code": machine_code})
        result = odoo_webservice("bxd.process.overall.detailed", "return_staff", obj)
        print(result)
        if result["status"] == "erro":
            return render(request, "relogin.html", {"message": result["message"], "status": "erro"})
        result = result["message"]
        Status_obj = Status_record(userAccount=card_id, status="上班", process=result['work_stage'],
                                   userName=result["userName"], station=result["station"])
        Status_obj.save()
        # return JsonResponse({"data": card_id, "status": "success"})
        return render(request, "cdf_clothes.html",
                      {"name": result["userName"],
                       "skill": result["job_id"],
                       "card_id": card_id,
                       "machine_code": machine_code,
                       "department": result["department"],
                       "work_stage": result["work_stage"],
                       "station": result["station"]})


# 刷卡登入cdf_trousers
def cdf_trousers(request, machine_code, card_id):
    if request.method == "GET":
        print(card_id)
        print(machine_code)
        obj = str({"card_id": card_id, "machine_code": machine_code})
        result = odoo_webservice("bxd.process.overall.detailed", "return_staff", obj)
        print(result)
        if result["status"] == "erro":
            return render(request, "relogin.html", {"message": result["message"], "status": "erro"})
        result = result["message"]
        Status_obj = Status_record(userAccount=card_id, status="上班", process=result['work_stage'],
                                   userName=result["userName"], station=result["station"])
        Status_obj.save()
        # return JsonResponse({"data": card_id, "status": "success"})
        return render(request, "cdf_trousers.html",
                      {"name": result["userName"],
                       "skill": result["job_id"],
                       "card_id": card_id,
                       "machine_code": machine_code,
                       "department": result["department"],
                       "work_stage": result["work_stage"],
                       "station": result["station"]})


# 压衬页面
def yachen(request, machine_code, card_id):
    if request.method == "GET":
        print(card_id)
        print(machine_code)
        obj = str({"card_id": card_id, "machine_code": machine_code})
        result = odoo_webservice("bxd.process.overall.detailed", "return_staff", obj)
        print(result)
        if result["status"] == "erro":
            return render(request, "relogin.html", {"message": result["message"], "status": "erro"})
        result = result["message"]
        Status_obj = Status_record(userAccount=card_id, status="上班", process=result['work_stage'],
                                   userName=result["userName"], station=result["station"])
        Status_obj.save()
        # return JsonResponse({"data": card_id, "status": "success"})
        return render(request, "yachen.html",
                      {"name": result["userName"],
                       "skill": result["job_id"],
                       "card_id": card_id,
                       "machine_code": machine_code,
                       "department": result["department"],
                       "work_stage": result["work_stage"],
                       "station": result["station"]})


# 里布编号
def lb_number(request, machine_code, card_id):
    if request.method == "GET":
        print(card_id)
        print(machine_code)
        obj = str({"card_id": card_id, "machine_code": machine_code})
        result = odoo_webservice("bxd.process.overall.detailed", "return_staff", obj)
        print(result)
        if result["status"] == "erro":
            return render(request, "relogin.html", {"message": result["message"], "status": "erro"})
        result = result["message"]
        Status_obj = Status_record(userAccount=card_id, status="上班", process=result['work_stage'],
                                   userName=result["userName"], station=result["station"])
        Status_obj.save()
        # return JsonResponse({"data": card_id, "status": "success"})
        return render(request, "lb_number.html",
                      {"name": result["userName"],
                       "skill": result["job_id"],
                       "card_id": card_id,
                       "machine_code": machine_code,
                       "department": result["department"],
                       "work_stage": result["work_stage"],
                       "station": result["station"]})


def person_message(request, machine_code, card_id):
    if request.method == "GET":
        print(card_id)
        print(machine_code)
        obj = str({"card_id": card_id, "machine_code": machine_code})
        result = odoo_webservice("bxd.process.overall.detailed", "return_staff", obj)
        print(result)
        videolist = Video_bxd.objects.filter(process=result['message']['work_stage']).all()
        videodefault = Video_bxd.objects.filter(process=result['message']['work_stage']).first()
        return render(request, "person_message.html",
                      {"name": result['message']["userName"],
                       "skill": result['message']["job_id"],
                       "card_id": card_id,
                       "station": result['message']["station"],
                       "videolist": videolist,
                       "videodefault": videodefault
                       })


# 扫描
def workmessage(request):
    if request.method == "POST":
        card_id = request.POST.get("card_id")
        code = request.POST.get("code")
        process = request.POST.get("process")
        station = request.POST.get("station")
        search = dict()
        search['process'] = process
        search['code'] = code
        obj = str({"card_id": card_id, "code": code, "department": process, "station": station})
        result = odoo_webservice("bxd.process.overall.detailed", "create_details", obj)
        if result["status"] == "erro":
            return JsonResponse({"message": result["message"], "status": "erro", "smcode": code})
        result = json.loads(result["message"])
        try:
            result['serial_number']
        except:
            result['serial_number'] = ''
        try:
            result['Mo']
        except:
            result['Mo'] = ''
        AlreadyCode = Code_record.objects.filter(**search)
        if AlreadyCode:
            result['AlreadyCode_time'] = AlreadyCode[0].createTime.strftime('%Y-%m-%d %H:%M')
            result['AlreadyCode_station'] = AlreadyCode[0].station
            print("already code")
        else:
            record_obj = Code_record(userAccount=card_id, userName=result["userName"],
                                     process=process, station=station, code=code,
                                     serial_number=result["serial_number"], So=result["So"],
                                     customer=result["version_commission"][0]["客户"],
                                     Mo=result["Mo"], num=result["num"]
                                     )
            record_obj.save()
        return JsonResponse({"data": result,
                             "status": "success",
                             "smcode": code,
                             })


# 历史单据
def history(request):
    if request.method == "POST":
        card_id = request.POST.get("card_id")
        station = request.POST.get("station")
        # page = request.POST.get('page_id',1)
        search = dict()
        search['card_id'] = card_id
        search['station'] = station
        now = datetime.datetime.now()
        start = now - datetime.timedelta(hours=69, minutes=177, seconds=177)
        code_history = Code_record.objects.filter(userAccount=card_id, station=station, createTime__gt=start)
        history_list = []
        # paginator = Paginator(code_history, 15)
        # page_obj = paginator.page(page)
        # pages = paginator.num_pages
        for k in code_history:
            codedict = {"So": k.So, "客户": k.customer, "扫码时间": k.createTime, "二维码": k.code}
            history_list.append(codedict)
        return JsonResponse({"data": history_list, "status": "success"})


# 下班
def offwork(request):
    if request.method == "POST":
        card_id = request.POST.get("card_id")
        process = request.POST.get("process")
        station = request.POST.get("station")
        obj = str({"card_id": card_id})
        result = odoo_webservice("bxd.process.overall.detailed", "off_work", obj)
        print(json.loads(result["message"])['userName'])
        if result["status"] == "erro":
            return JsonResponse({"message": result["message"], "status": "erro"})
        Status_obj = Status_record(userAccount=card_id, status="下班", process=process,
                                   userName=json.loads(result["message"])['userName'], station=station)
        Status_obj.save()
        return JsonResponse({"data": result["message"], "status": "success"})


# 暂停报工
def stopTime(request):
    if request.method == "POST":
        process = request.POST.get("process")
        card_id = request.POST.get("card_id")
        station = request.POST.get("station")
        print(card_id)
        obj = str({"card_id": card_id})
        result = odoo_webservice("bxd.process.overall.detailed", "leave_work", obj)
        if result["status"] == "erro":
            return JsonResponse({"message": result["message"], "status": "erro"})
        Status_obj = Status_record(userAccount=card_id, status="暂停报工", process=process,
                                   userName=json.loads(result["message"])['userName'], station=station)
        Status_obj.save()
        print(result)
        return JsonResponse({"data": result["message"], "status": "success"})


# 恢复报工
def recoverTime(request):
    if request.method == "POST":
        card_id = request.POST.get("card_id")
        process = request.POST.get("process")
        station = request.POST.get("station")
        obj = str({"card_id": card_id})
        result = odoo_webservice("bxd.process.overall.detailed", "return_work", obj)
        print(result)
        if result["status"] == "erro":
            return JsonResponse({"message": result["message"], "status": "erro"})
        Status_obj = Status_record(userAccount=card_id, status="恢复报工", process=process,
                                   userName=json.loads(result["message"])['userName'], station=station)
        Status_obj.save()
        return JsonResponse({"data": result["message"], "status": "success"})


# 故障
def trouble(request):
    if request.method == "POST":
        card_id = request.POST.get("card_id")
        userName = request.POST.get("userName")
        process = request.POST.get("process")
        station = request.POST.get("station")
        reason = request.POST.get("reason")
        Status_obj = Status_record(userAccount=card_id, status="故障报工", process=process,
                                   userName=userName, reason=reason, station=station)
        Status_obj.save()
        return JsonResponse({"status": "success"})


clients = []
import threading
from dwebsocket.decorators import accept_websocket


@accept_websocket
def echo(request):
    if not request.is_websocket():  # 判断是不是websocket连接
        try:  # 如果是普通的http方法
            message = request.GET["message"]
            return HttpResponse(message)
        except:
            return render(request, "index.html")
    else:
        lock = threading.RLock()
        try:
            lock.acquire()
            clients.append(request.websocket)
            for message in request.websocket:
                for client in clients:
                    if not message:
                        pass
                    else:
                        client.send(message)
        finally:
            clients.remove(request.websocket)
            lock.release()
