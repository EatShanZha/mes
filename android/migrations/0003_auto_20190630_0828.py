# Generated by Django 2.1.4 on 2019-06-30 00:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('android', '0002_auto_20190624_1015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='machine',
            name='path',
            field=models.CharField(choices=[('cdf_clothes', 'cdf_clothes'), ('cdf_trousers', 'cdf_trousers'), ('cdl_clothes', 'cdl_clothes'), ('cdl_trousers', 'cdl_trousers'), ('cdm_clothes', 'cdm_clothes'), ('cdm_trousers', 'cdm_trousers'), ('serial_number', 'serial_number'), ('sample_clothes', 'sample_clothes')], max_length=20, verbose_name='路径'),
        ),
    ]
