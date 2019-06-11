# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class User(models.Model):
    userAccount = models.CharField(max_length=20,unique=True)
    userPasswd = models.CharField(max_length=20)
    userName = models.CharField(max_length=20)
    userToken = models.CharField(max_length=50)
    createTime = models.DateTimeField(auto_now_add=True,blank=True)
    def __str__(self):
        return self.userName
    # @classmethod
    # def create_user(cls,userAccount,userPasswd,userName,userToken,createTime):
    #     stu = cls(userAccount=userAccount,userPasswd=userPasswd,userName=userName,userToken=userToken,createTime=createTime)
    #     return stu

class Code_record(models.Model):
    userAccount = models.CharField(max_length=20)
    userName = models.CharField(max_length=20)
    # gongxu
    process = models.CharField(max_length=20)
    code = models.CharField(max_length=50)
    serial_number = models.CharField(max_length=50)
    createTime = models.DateTimeField(auto_now_add=True, blank=True)

class Status_record(models.Model):
    userAccount = models.CharField(max_length=20)
    userName = models.CharField(max_length=20)
    # gongxu
    process = models.CharField(max_length=20)
    status = models.CharField(max_length=20)
    createTime = models.DateTimeField(auto_now_add=True, blank=True)