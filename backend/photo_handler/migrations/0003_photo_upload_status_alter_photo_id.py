# Generated by Django 5.1.4 on 2024-12-31 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photo_handler', '0002_remove_photo_checksum_remove_photo_s3_url_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='upload_status',
            field=models.CharField(default='pending', max_length=20),
        ),
        migrations.AlterField(
            model_name='photo',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
