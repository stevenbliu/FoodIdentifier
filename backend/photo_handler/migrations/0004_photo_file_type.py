# Generated by Django 5.1.6 on 2025-02-12 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photo_handler', '0003_photo_upload_status_alter_photo_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='file_type',
            field=models.CharField(default='unknown', max_length=10),
        ),
    ]
