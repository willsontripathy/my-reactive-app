import { createInjectableType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Ability, AbilityBuilder } from '@casl/ability';

type Action = 'create' | 'read' | 'update' | 'delete';
type Subject = 'Article' | 'User' | 'Comment';

@Injectable({
    providedIn: 'root'
})
export class AppAbility {
    constructor(private ability: Ability) { }
    add() {
        const ability = new Ability<[Action, Subject]>();
        ability.can('read', 'Article');
        ability.can('create', 'Article');
        ability.can('update', 'Comment')
        ability.rules.forEach(r => console.log(r));
    }
}

export enum AppAbilityEnum {
    ABILITY1 = 'ability1',
    ABILITY2 = 'ability2',
    ABILITY3 = 'ability3',
    ABILITY4 = 'ability4',
}