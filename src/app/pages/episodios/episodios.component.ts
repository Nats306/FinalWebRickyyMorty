import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRickyandmortyService } from '../../../services/service-rickyandmorty.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-episodios',
  imports: [CommonModule],
  templateUrl: './episodios.component.html',
  styleUrl: './episodios.component.scss'
})
export class EpisodiosComponent {
  episodeList: any[] = [];

  constructor(private serviceRickyMorty: ServiceRickyandmortyService) {

  }

  ngOnInit() {
    this.getEpisodes();
  }

  getEpisodes() {
    this.serviceRickyMorty.getEpisodes().subscribe({
      next: (res: any) => {
        this.episodeList = res.results;
        console.log('Episodios obtenidos: ', this.episodeList);
      },
      error: (err: any) => {
        console.error('Error al obtener episiodios: ', err)
      }
    })
  }

  characterList: any[] = [];

  getCharacters(episode: any) {
    const characterUrls = episode.characters;
    const characterObservables = characterUrls.map((url: string) => this.serviceRickyMorty.getCharactersByUrl(url));

    forkJoin(characterObservables).subscribe({
      next: (characters: any) => {
        this.characterList = characters;
        console.log('Personajes obtenidos del episodio:', characters);
      },
      error: (err: any) => {
        console.error('Error al obtener personajes del episodio.', err);
      }
    });
  }

  activeEpisodeId: number | null = null;

  onCharactersClick(episode: any) {
    if (this.activeEpisodeId === episode.id) {
      this.activeEpisodeId = null; // Cierra si ya está abierto
    } else {
      this.activeEpisodeId = episode.id;
      this.getCharacters(episode);
    }
  }

}
