# Generated by Django 3.1.4 on 2021-01-14 10:14

import apps.user.models.user_models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_auto_20210114_1010'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='/default_images/avatar.png', upload_to=apps.user.models.user_models.user_avatar_directory),
        ),
    ]
