# Generated by Django 4.2 on 2023-05-21 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('majorsweb', '0014_team_bot_link_team_website_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='union_img',
            field=models.ImageField(blank=True, upload_to='unions/'),
        ),
    ]
