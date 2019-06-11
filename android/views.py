# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import time
import datetime
import random
from django.shortcuts import render,redirect,HttpResponse
from android.models import User
import json
from android.models import Status_record
from android.models import Code_record
from functools import wraps
from xmlrpc import client
from django.http import JsonResponse




# Create your views here.

# 封装odoo端口
def odoo_webservice(cl,func,obj):
    # url = "http://192.168.1.140:8069"
    # db = "BXD_ERP0424"
    url = "http://192.168.1.86:8069"
    db = "123456"
    username = "admin"
    password = "erpstddata"
    common = client.ServerProxy("{}/xmlrpc/2/common".format(url))
    common.version()
    uid = common.authenticate(db, username, password, {})
    models = client.ServerProxy("{}/xmlrpc/2/object".format(url))
    result = models.execute_kw(db, uid, password,cl, func,
                               ["ss", obj])
    return result

def login(request):
    if request.method == "POST":
        machine_code = str(request.POST.get("machine_code"))
        print(machine_code)
        obj = str({"machine_code": machine_code})
        print (machine_code)
        # Status_obj = Status_record(userAccount=request.POST.get("account"), status="上班", process="精改")
        # Status_obj.save()
        result = odoo_webservice("bxd.process.overall.detailed","login_verify",obj)
        print(result)

        if result['page']:
            print(result['page'])
            return HttpResponse(result['page'])
        else:
            return JsonResponse({"status": "false"})

def gbkc(request,str):
    if request.method == "GET":
        print (str)
        # if result['userName']:
        return JsonResponse({"data": str, "status":"success"})

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
        result = odoo_webservice("bxd.process.overall.detailed","return_staff", code)
        return render(request, "workdetail.html", {"ab": result["name"]})
# 登录刷卡
def workdetail(request,card_id,machine_code):
    if request.method == "GET":
        print(card_id)
        print(machine_code)
        obj = str({"card_id": card_id,"machine_code":machine_code})
        result = odoo_webservice("bxd.process.overall.detailed","return_staff", obj)
        print(result)
        Status_obj = Status_record(userAccount=card_id, status="上班", process="精改",userName=result["userName"])
        Status_obj.save()
        # return JsonResponse({"data": card_id, "status": "success"})
        return render(request, "workdetail.html", {"name": result["userName"],"skill":result["job_id"],"card_id":card_id,"department":result["department"],"work_stage":result["work_stage"],"station":result["station"]})

# 扫描
def workmessage(request):
    if request.method == "POST":
        card_id = request.POST.get("card_id")
        code = request.POST.get("code")
        department=request.POST.get("department")
        type = request.POST.get("type")
        obj=str({"card_id":card_id,"code":code,"department":department,"type":type})
        result = odoo_webservice("bxd.process.overall.detailed","create_details", obj)
        print(card_id)
        print(code)
        record_obj=Code_record(userAccount=card_id,userName=json.loads(result)["userName"],process=department,code=code,serial_number=json.loads(result)["serial_number"])
        record_obj.save()
        if record_obj:
            print(record_obj)
            return JsonResponse({"data": result, "status": "success"})
        else:
            return JsonResponse({"data": result, "status": "success2"})

# 下班
def offwork(request):
    if request.method == "POST":
        card_id = request.POST.get("card_id")
        obj = str({"card_id": card_id})
        result = odoo_webservice("bxd.process.overall.detailed","off_work", obj)
        print(json.loads(result))
        print(json.loads(result)['userName'])
        Status_obj = Status_record(userAccount=card_id, status="下班", process="精改", userName=json.loads(result)['userName'])
        Status_obj.save()
        return JsonResponse({"data": result, "status": "success"})


# 暂停报工
def stopTime(request):
    if request.method == "POST":
        card_id = request.POST.get("card_id")
        print(card_id)
        obj = str({"card_id": card_id})
        result = odoo_webservice("bxd.process.overall.detailed","leave_work", obj)
        Status_obj = Status_record(userAccount=card_id, status="暂停报工", process="精改", userName=json.loads(result)['userName'])
        Status_obj.save()
        print(result)
        return JsonResponse({"data": result, "status": "success"})

# 恢复报工
def recoverTime(request):
    if request.method == "POST":
        card_id = request.POST.get("card_id")
        obj = str({"card_id": card_id})
        result = odoo_webservice("bxd.process.overall.detailed","return_work", obj)
        print(result)
        Status_obj = Status_record(userAccount=card_id, status="恢复报工", process="精改",
                                   userName=json.loads(result)['userName'])
        Status_obj.save()
        return JsonResponse({"data": result, "status": "success"})

clients=[]
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
