from django.db import models


# Create your models here.
class Livro (models.Model):
    nome = models.CharField(max_length=100)
    genero = models.CharField(max_length=50)
    autor = models.CharField(max_length=100)
    qtpagina = models.IntegerField()
    status = models.BooleanField (default=False, verbose_name='Livro lido', help_text='Este status refere-se à lido ou não lido')

    def __str__(self):
     return self.nome