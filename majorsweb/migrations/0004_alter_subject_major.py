# Generated by Django 4.2 on 2023-04-19 22:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('majorsweb', '0003_remove_subjects_category_major'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subject',
            name='major',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, to='majorsweb.major'),
        ),
    ]
