# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from AndroidOdoo import settings
# Create your models here.
class User(models.Model):
    card_id = models.CharField(verbose_name='机器码',max_length=20,unique=True)
    userName = models.CharField(max_length=20)
    createTime = models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return self.userName
    # @classmethod
    # def create_user(cls,userAccount,userPasswd,userName,userToken,createTime):
    #     stu = cls(userAccount=userAccount,userPasswd=userPasswd,userName=userName,userToken=userToken,createTime=createTime)
    #     return stu

class Code_record(models.Model):
    userAccount = models.CharField(verbose_name='卡号',max_length=20)
    userName = models.CharField(verbose_name='姓名',max_length=20)
    # gongxu
    process = models.CharField(verbose_name='工序',max_length=20)
    station = models.CharField(verbose_name='工位', max_length=20,default='')
    code = models.CharField(verbose_name='二维码',max_length=50)
    So = models.CharField(verbose_name='订单号', max_length=50, default='')
    Mo = models.CharField(verbose_name='生产制造订单', max_length=50, default='')
    num = models.IntegerField(verbose_name='数量', default=0)
    serial_number = models.CharField(verbose_name='流水号',max_length=50)
    createTime = models.DateTimeField(verbose_name='时间',auto_now_add=True, blank=True)
    customer = models.CharField(verbose_name='客户', max_length=50, default='')

    def __str__(self):
        return self.userName
    class Meta:
        ordering = ['-createTime']
        verbose_name_plural = '扫码记录'
        verbose_name = '扫码记录管理'

class Status_record(models.Model):
    userAccount = models.CharField(max_length=20)
    userName = models.CharField(max_length=20)
    # gongxu
    process = models.CharField(max_length=20)
    station = models.CharField(verbose_name='工位', max_length=20, default='')
    status = models.CharField(max_length=20)
    reason = models.CharField(max_length=20,default='')
    createTime = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return self.userName
    class Meta:
        ordering = ['-createTime']
        verbose_name_plural = '员工状态'
        verbose_name = '员工状态管理'

class Machine(models.Model):
    TYPE_CHOICES = (
        ('cdf_clothes', '裁剪大货辅料衣服'),
        ('cdf_trousers', '裁剪大货辅料裤子'),
        ('cdl_clothes', '裁剪大货里布衣服'),
        ('cdl_trousers', '裁剪大货里布裤子'),
        ('cdm_clothes', '裁剪大货面料衣服'),
        ('cdm_trousers', '裁剪大货面料裤子'),
        ('serial_number', '编号子流程'),
        ('sample_clothes', '样衣'),
        ('lb_number', '里布编号'),
        ('yachen','压衬页面')
    )
    machine_code = models.CharField(verbose_name='机器码',max_length=50,unique=True)
    department = models.CharField(verbose_name='工序',max_length=20)
    station = models.CharField(verbose_name='工位',max_length=20)
    workshop = models.CharField(verbose_name='车间', max_length=20)
    path = models.CharField(verbose_name='路径',max_length=20,choices=TYPE_CHOICES)
    def __str__(self):
        return self.machine_code
    class Meta:
        verbose_name_plural = '设备表'
        verbose_name = '设备管理'


class Video_bxd(models.Model):
    video_name = models.CharField(verbose_name='视频名称',max_length=50,unique=True)
    process = models.CharField(verbose_name='工序', max_length=20)
    file = models.FileField(upload_to='video',verbose_name="视频选择")
    def __str__(self):
        return self.video_name
    class Meta:
        verbose_name_plural = '视频表'
        verbose_name = '视频管理'