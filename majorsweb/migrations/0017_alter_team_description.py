# Generated by Django 4.2 on 2023-05-23 14:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('majorsweb', '0016_rename_team_team_short_team_long'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='description',
            field=models.CharField(blank=True, max_length=600),
        ),
    ]
