# Generated by Django 4.2.13 on 2024-07-02 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='OutlookFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('path', models.FilePathField(unique=True)),
                ('is_backed_up', models.BooleanField(default=False)),
            ],
        ),
    ]
