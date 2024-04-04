#!/usr/bin/env bash

stop_supabase() {
	supabase stop
	exit
}

supabase start

printf "\nPress Ctrl+C to stop\n\n"

trap stop_supabase SIGINT

while true; do
    sleep 1
done
